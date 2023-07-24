import { Communities } from 'app/models/communities'
import { SubCommunities } from 'app/models/sub_communities'
import { Threads } from 'app/models/threads'
import {
  Attributes,
  CreationAttributes,
  Includeable,
  ProjectionAlias,
  Sequelize,
  WhereOptions,
} from 'sequelize'

export namespace ThreadRepository {
  const relations: Includeable[] = [
    'tenants',
    'community',
    'sub_community',
    'status',
    'likes',
    'comments',
  ]
  const includeableThreads = (user_id?: number): (string | ProjectionAlias)[] => [
    [
      Sequelize.literal(`(
        SELECT status
        FROM "master_statuses" as "status"
        WHERE 
          "status"."id" = "Threads"."status_id"
      )`),
      'status_name',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "thread_tenants" as "tenants"
          WHERE 
            "tenants"."thread_id" = "Threads"."id"
        )`),
        'int',
      ),
      'total_tenants',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "thread_likes" as "likes"
          WHERE 
            "likes"."thread_id" = "Threads"."id"
        )`),
        'int',
      ),
      'total_likes',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "thread_comments" as "comments"
          WHERE 
            "comments"."thread_id" = "Threads"."id"
        )`),
        'int',
      ),
      'total_comments',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT CASE WHEN EXISTS (
            SELECT * FROM "thread_likes" as "likes"
            WHERE 
              "likes"."user_id" = ${user_id}
              AND "likes"."thread_id" = "Threads"."id"
          )
          THEN true
          ELSE false
          END
        )`),
        'boolean',
      ),
      'is_liked',
    ],
  ]
  export async function GetListThread(
    user_id: number,
    props: Parameters<typeof Threads.findAll>[0],
  ) {
    return Promise.all([
      Threads.count({ where: props?.where }),
      Threads.findAll({
        ...props,
        include: relations,
        attributes: { include: includeableThreads(user_id) },
      }),
    ]).then((res) => {
      const [count, rows] = res
      return { count, rows }
    })
  }

  export function GetMyThreads(where: WhereOptions<Threads>) {
    return SubCommunities.findAll({
      include: [
        {
          model: Communities,
          as: 'community',
          where: { is_active: true },
          attributes: [],
          order: [['community.id', 'ASC']],
        },
        { model: Threads, as: 'threads', where: { ...where, is_active: true } },
      ],
      attributes: [
        'id',
        [
          Sequelize.literal(`(
            SELECT CONCAT("community"."name", ' - ', "SubCommunities"."name")
            FROM "communities" AS "community"
            WHERE
              "community"."id" = "SubCommunities"."community_id"
          )`),
          'name',
        ],
        [
          Sequelize.cast(
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "threads"
              WHERE 
                "threads"."sub_community_id" = "SubCommunities"."id"
                AND "threads"."deleted_at" IS NULL
            )`),
            'int',
          ),
          'total_threads',
        ],
        'image_url',
      ],
      where: { is_active: true },
    })
  }

  export function GetDetailThread(user_id: number, where: WhereOptions<Threads>) {
    return Threads.findOne({
      include: relations,
      attributes: { include: includeableThreads(user_id) },
      where,
    })
  }

  export function CreateThread(payload: CreationAttributes<Threads>) {
    return Threads.create(payload)
  }

  export function UpdateThread(
    id: number,
    payload: { [key in keyof Attributes<Threads>]?: Attributes<Threads>[key] },
  ) {
    return Threads.update(payload, { where: { id }, returning: true })
  }

  export function DeleteThread(where: WhereOptions<Threads>) {
    return Threads.destroy({ where })
  }

  export function IncrementThreadView(where: WhereOptions<Threads>) {
    return Threads.increment({ views: 1 }, { where })
  }
}
