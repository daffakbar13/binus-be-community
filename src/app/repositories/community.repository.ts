import { Communities } from 'app/models/communities'
import {
  Attributes,
  CreationAttributes,
  Includeable,
  ProjectionAlias,
  Sequelize,
  WhereOptions,
} from 'sequelize'

export namespace CommunityRepository {
  const relations: Includeable[] = []

  const includeable = (user_id: number): (string | ProjectionAlias)[] => [
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "community_members" as "members"
          WHERE 
            "members"."community_id" = "Communities"."id"
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
          FROM "sub_communities" as "sc"
          WHERE 
            "sc"."community_id" = "Communities"."id"
            AND "sc"."deleted_at" IS NULL
        )`),
        'int',
      ),
      'total_sub_communities',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "banners" AS "b"
          WHERE 
            "b"."community_id" = "Communities"."id"
        )`),
        'int',
      ),
      'total_banners',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "threads" AS "t"
          WHERE 
            "t"."community_id" = "Communities"."id"
            AND "t"."deleted_at" IS NULL
        )`),
        'int',
      ),
      'total_threads',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT CASE WHEN EXISTS (
            SELECT "members"."id" FROM "community_members" as "members"
            WHERE 
              "members"."user_id" = ${user_id}
              AND "members"."community_id" = "Communities"."id"
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
            SELECT "members"."id" FROM "community_members" as "members"
            WHERE 
              "members"."user_id" = ${user_id}
              AND "members"."community_id" = "Communities"."id"
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

  export function GetListCommunity(
    user_id: number,
    props: Parameters<typeof Communities.findAll>[0],
  ) {
    return Communities.findAndCountAll({
      ...props,
      include: relations,
      attributes: { include: includeable(user_id) },
      distinct: true,
    })
  }

  export function GetDetailCommunity(user_id: number, where: WhereOptions<Communities>) {
    return Communities.findOne({
      include: relations,
      attributes: { include: includeable(user_id) },
      where,
    })
  }

  export function CreateCommunity(payload: CreationAttributes<Communities>) {
    return Communities.create(payload)
  }

  export function UpdateCommunity(
    id: number,
    payload: { [key in keyof Attributes<Communities>]?: Attributes<Communities>[key] },
  ) {
    return Communities.update(payload, { where: { id }, returning: true })
  }

  export function DeleteCommunity(where: WhereOptions<Communities>) {
    return Communities.destroy({ where })
  }
}
