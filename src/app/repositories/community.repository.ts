import { Communities } from 'app/models/communities'
import { PaginationDto } from 'common/dto/pagination.dto'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace CommunityRepository {
  const relations = ['sub_communities', 'banners', 'threads']

  export async function GetListCommunity(
    pagination?: PaginationDto.PaginationObjectType,
    where?: WhereOptions,
  ) {
    return {
      count: await Communities.count({ where }),
      rows: await Communities.findAll({ include: relations, ...pagination, where }),
    }
  }

  export function GetDetailCommunity(where: WhereOptions<Communities>) {
    return Communities.findOne({ where, include: relations })
  }

  export function CreateCommunity(payload: CreationAttributes<Communities>) {
    return Communities.create(payload)
  }

  export function UpdateCommunity(
    id: number,
    payload: { [key in keyof Attributes<Communities>]?: Attributes<Communities>[key] },
  ) {
    return Communities.update(payload, { where: { id } })
  }

  export function DeleteCommunity(where: WhereOptions<Communities>) {
    return Communities.destroy({ where })
  }
}
