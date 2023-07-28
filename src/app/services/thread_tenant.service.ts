import { ThreadTenantRepository } from 'app/repositories/thread_tenant.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { UserService } from './user.service'

export namespace ThreadTenantService {
  export async function GetListThreadTenant() {
    try {
      const result = await ThreadTenantRepository.GetListThreadTenant()
      return baseResponse('Ok', { results: result })
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailThreadTenant(req: Request) {
    try {
      const result = await ThreadTenantRepository.GetDetailThreadTenant({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateThreadTenant(thread_id: number, tenant_ids: string[]) {
    const payload = tenant_ids.map((tenant_uuid) => ({ thread_id, tenant_uuid }))
    const result = await ThreadTenantRepository.CreateThreadTenant(payload)
    return result
  }

  export async function UpdateThreadTenant(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [, [result]] = await ThreadTenantRepository.UpdateThreadTenant(
          Number(req.params.id),
          {
            ...req.body,
            user_id: user.data.id,
          },
        )
        return baseResponse('Ok', result)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteThreadTenant(req: Request) {
    try {
      await ThreadTenantRepository.DeleteThreadTenant({ id: req.params.id })
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
