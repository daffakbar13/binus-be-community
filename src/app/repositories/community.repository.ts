import { Communities } from 'app/models/communities'
import { Attributes, CreationAttributes, ProjectionAlias, Sequelize, WhereOptions } from 'sequelize'

export namespace CommunityRepository {
  const relations = ['sub_communities', 'banners', 'threads']

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
            SELECT * FROM "community_members" as "members"
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
  ]

  export async function GetListCommunity(
    user_id: number,
    props: Parameters<typeof Communities.findAll>[0],
  ) {
    return Promise.all([
      Communities.count({ where: props?.where }),
      Communities.findAll({
        ...props,
        include: relations,
        attributes: { include: includeable(user_id) },
      }),
    ]).then((res) => {
      const [count, rows] = res
      return { count, rows }
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
