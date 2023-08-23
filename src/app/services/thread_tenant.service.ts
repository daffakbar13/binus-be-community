import { ThreadTenantRepository } from 'app/repositories/thread_tenant.repository'
import { Constant } from 'common/constants'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { LoggingService } from './logging.service'

export namespace ThreadTenantService {
  export async function GetListThreadTenant(req: Request) {
    try {
      const result = await ThreadTenantRepository.GetListThreadTenant()
      return baseResponse('Ok', { results: result })
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailThreadTenant(req: Request) {
    try {
      const result = await ThreadTenantRepository.GetDetailThreadTenant({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateThreadTenant(thread_id: number, tenant_uuids: string | string[]) {
    const payload: any[] = []
    if (Array.isArray(tenant_uuids)) {
      payload.push(...tenant_uuids.map((tenant_uuid) => ({ thread_id, tenant_uuid })))
    } else {
      payload.push({ thread_id, tenant_uuid: tenant_uuids })
    }
    const result = await ThreadTenantRepository.CreateThreadTenant(payload)
    return result
  }

  export async function UpdateThreadTenant(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const [, [result]] = await ThreadTenantRepository.UpdateThreadTenant(
          Number(req.params.id),
          {
            ...req.body,
            user_id: user.id,
          },
        )
        return baseResponse('Ok', result)
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteThreadTenant(req: Request) {
    try {
      await ThreadTenantRepository.DeleteThreadTenant({ id: req.params.id })
      return baseResponse('Ok')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }
}
