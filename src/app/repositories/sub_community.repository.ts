import { SubCommunities } from 'app/models/sub_communities'
import { PaginationDto } from 'common/dto/pagination.dto'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace SubCommunityRepository {
  const relations = ['community', 'threads', 'members']

  export async function GetListSubCommunity(
    pagination?: PaginationDto.PaginationObjectType,
    where?: WhereOptions,
  ) {
    return {
      count: await SubCommunities.count({ where }),
      rows: await SubCommunities.findAll({ include: relations, ...pagination, where }),
    }
  }

  export function GetDetailSubCommunity(where: WhereOptions<SubCommunities>) {
    return SubCommunities.findOne({ where, include: relations })
  }

  export function CreateSubCommunity(payload: CreationAttributes<SubCommunities>) {
    return SubCommunities.create(payload)
  }

  export function UpdateSubCommunity(
    id: number,
    payload: { [key in keyof Attributes<SubCommunities>]?: Attributes<SubCommunities>[key] },
  ) {
    return SubCommunities.update(payload, { where: { id } })
  }

  export function DeleteSubCommunity(where: WhereOptions<SubCommunities>) {
    return SubCommunities.destroy({ where })
  }
}
