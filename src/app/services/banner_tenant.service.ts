import { BannerTenantRepository } from 'app/repositories/banner_tenant.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Constant } from 'common/constants'
import { LoggingService } from './logging.service'

export namespace BannerTenantService {
  export async function GetListBannerTenant(req: Request) {
    try {
      const result = await BannerTenantRepository.GetListBannerTenant()
      return baseResponse('Ok', { results: result })
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailBannerTenant(req: Request) {
    try {
      const result = await BannerTenantRepository.GetDetailBannerTenant({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateBannerTenant(
    req: Request,
    banner_id: number,
    tenant_uuids: string | string[],
  ) {
    try {
      const payload: any[] = []
      if (Array.isArray(tenant_uuids)) {
        payload.push(...tenant_uuids.map((tenant_uuid) => ({ banner_id, tenant_uuid })))
      } else {
        payload.push({ banner_id, tenant_uuid: tenant_uuids })
      }
      const result = await BannerTenantRepository.CreateBannerTenant(payload)
      return result
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return []
    }
  }

  export async function UpdateBannerTenant(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const [, [result]] = await BannerTenantRepository.UpdateBannerTenant(
          Number(req.params.id),
          {
            ...req.body,
            user_id: user.id,
          },
        )
        return baseResponse('Ok', result)
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteBannerTenant(req: Request) {
    try {
      await BannerTenantRepository.DeleteBannerTenant({ id: req.params.id })
      return baseResponse('Ok')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }
}
