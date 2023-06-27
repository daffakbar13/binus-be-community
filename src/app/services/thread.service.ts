import { ThreadRepository } from 'app/repositories/thread.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadTenantRepository } from 'app/repositories/thread_tenant.repository'
import { UserService } from './user.service'
import { ThreadTenantService } from './thread_tenant.service'

export namespace ThreadService {
  export async function GetListThread() {
    try {
      const result = await ThreadRepository.GetListThread()
      return baseResponse('Ok', { results: result })
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailThread(req: Request) {
    try {
      if (req.query.increase_view === 'true') {
        await ThreadRepository.IncrementThreadView({ id: req.params.id })
      }
      const result = await ThreadRepository.GetDetailThread({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateThread(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const { tenant_ids } = req.body
        const result = await ThreadRepository.CreateThread({
          ...req.body,
          user_id: user.data.id,
        })
        if (tenant_ids) {
          await ThreadTenantService.CreateThreadTenant(result.id, tenant_ids)
        }
        return baseResponse('Ok', result)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateThread(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await ThreadRepository.UpdateThread(Number(req.params.id), {
          ...req.body,
          user_id: user.data.id,
        })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteThread(req: Request) {
    try {
      const { id } = req.params
      await ThreadRepository.DeleteThread({ id })
      await ThreadTenantRepository.DeleteThreadTenant({ thread_id: id })
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
