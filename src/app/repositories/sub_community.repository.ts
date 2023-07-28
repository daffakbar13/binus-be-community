import { Communities } from 'app/models/communities'
import { SubCommunities } from 'app/models/sub_communities'
import {
  Attributes,
  CreationAttributes,
  Includeable,
  ProjectionAlias,
  Sequelize,
  WhereOptions,
} from 'sequelize'

export namespace SubCommunityRepository {
  const relations = (where?: WhereOptions<Communities>): Includeable[] => [
    {
      model: Communities,
      as: 'community',
      where,
    },
  ]

  const includeable = (user_id: number): (string | ProjectionAlias)[] => [
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "sub_community_members" as "members"
          WHERE 
            "members"."sub_community_id" = "SubCommunities"."id"
            AND "members"."is_approved" = true
        )`),
        'int',
      ),
      'total_members',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "threads" as "threads"
          WHERE 
            "threads"."sub_community_id" = "SubCommunities"."id"
            AND "threads"."deleted_at" IS NULL
        )`),
        'int',
      ),
      'total_threads',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT CASE WHEN EXISTS (
            SELECT "members"."id" FROM "sub_community_members" as "members"
            WHERE 
              "members"."user_id" = ${user_id}
              AND "members"."sub_community_id" = "SubCommunities"."id"
              AND "members"."is_approved" = true
          )
          THEN true
          ELSE false
          END
        )`),
        'boolean',
      ),
      'is_member',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT CASE WHEN EXISTS (
            SELECT "members"."id" FROM "sub_community_members" as "members"
            WHERE 
              "members"."user_id" = ${user_id}
              AND "members"."sub_community_id" = "SubCommunities"."id"
              AND "members"."is_approved" = false
          )
          THEN true
          ELSE false
          END
        )`),
        'boolean',
      ),
      'is_request_member',
    ],
  ]

  export async function GetListSubCommunity(
    user_id: number,
    props: Parameters<typeof SubCommunities.findAll>[0],
    whereCommunity?: WhereOptions<Communities>,
  ) {
    return SubCommunities.findAndCountAll({
      ...props,
      include: relations(whereCommunity),
      attributes: { include: includeable(user_id) },
      distinct: true,
    })
  }

  export function GetDetailSubCommunity(
    user_id: number,
    where: WhereOptions<SubCommunities>,
    whereCommunity?: WhereOptions<Communities>,
  ) {
    return SubCommunities.findOne({
      include: relations(whereCommunity),
      attributes: { include: includeable(user_id) },
      where,
    })
  }

  export function CreateSubCommunity(payload: CreationAttributes<SubCommunities>) {
    return SubCommunities.create(payload)
  }

  export function UpdateSubCommunity(
    id: number,
    payload: { [key in keyof Attributes<SubCommunities>]?: Attributes<SubCommunities>[key] },
  ) {
    return SubCommunities.update(payload, { where: { id }, returning: true })
  }

  export function DeleteSubCommunity(where: WhereOptions<SubCommunities>) {
    return SubCommunities.destroy({ where })
  }
}
