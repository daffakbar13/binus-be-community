import { BannerTenants } from 'app/models/banner_tenants'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace BannerTenantRepository {
  export function GetListBannerTenant() {
    return BannerTenants.findAll()
  }

  export function GetDetailBannerTenant(where: WhereOptions<BannerTenants>) {
    return BannerTenants.findOne({ where })
  }

  export function CreateBannerTenant(payload: CreationAttributes<BannerTenants>[]) {
    return BannerTenants.bulkCreate(payload)
  }

  export function UpdateBannerTenant(
    id: number,
    payload: { [key in keyof Attributes<BannerTenants>]?: Attributes<BannerTenants>[key] },
  ) {
    return BannerTenants.update(payload, { where: { id }, returning: true })
  }

  export function DeleteBannerTenant(where: WhereOptions<BannerTenants>) {
    return BannerTenants.destroy({ where })
  }
}
