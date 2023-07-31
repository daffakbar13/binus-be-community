import { BannerTenantRepository } from 'app/repositories/banner_tenant.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'

export namespace BannerTenantService {
  export async function GetListBannerTenant() {
    try {
      const result = await BannerTenantRepository.GetListBannerTenant()
      return baseResponse('Ok', { results: result })
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailBannerTenant(req: Request) {
    try {
      const result = await BannerTenantRepository.GetDetailBannerTenant({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateBannerTenant(banner_id: number, tenant_uuids: string[]) {
    const payload = tenant_uuids.map((tenant_uuid) => ({ banner_id, tenant_uuid }))
    const result = await BannerTenantRepository.CreateBannerTenant(payload)
    return result
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
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteBannerTenant(req: Request) {
    try {
      await BannerTenantRepository.DeleteBannerTenant({ id: req.params.id })
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
