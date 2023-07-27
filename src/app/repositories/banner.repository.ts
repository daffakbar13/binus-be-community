import { Banners } from 'app/models/banners'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace BannerRepository {
  export function GetBannerList(props: Parameters<typeof Banners.findAll>[0]) {
    return Banners.findAndCountAll({
      ...props,
      distinct: true,
    })
  }

  export function GetBannerDetail(where: WhereOptions<Banners>) {
    return Banners.findOne({ where })
  }

  export function CreateBanner(payload: CreationAttributes<Banners>) {
    return Banners.create(payload)
  }

  export function UpdateBanner(
    id: number,
    payload: { [key in keyof Attributes<Banners>]?: Attributes<Banners>[key] },
  ) {
    return Banners.update(payload, { where: { id }, returning: true })
  }

  export function DeleteBanner(where: WhereOptions<Banners>) {
    return Banners.destroy({ where })
  }
}
