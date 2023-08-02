import { Communities } from 'app/models/communities'
import { SubCommunities } from 'app/models/sub_communities'
import { ThreadComments } from 'app/models/thread_comments'
import { ThreadTenants } from 'app/models/thread_tenants'
import { Threads } from 'app/models/threads'
import {
  Attributes,
  CreationAttributes,
  Includeable,
  ProjectionAlias,
  Sequelize,
  WhereOptions,
} from 'sequelize'

export namespace ThreadCommentRepository {
  const relations = (whereThreadTenants?: WhereOptions): Includeable[] => [
    {
      model: ThreadTenants,
      as: 'tenants',
      attributes: [],
      where: whereThreadTenants,
    },
    {
      model: Threads,
      as: 'thread',
      required: true,
      include: [
        {
          model: Communities,
          as: 'community',
          required: true,
        },
        {
          model: SubCommunities,
          as: 'sub_community',
          required: true,
        },
      ],
    },
    'status',
  ]
  const includeableThreadComments = (user_id?: number): (string | ProjectionAlias)[] => [
    [
      Sequelize.literal(`(
        SELECT status
        FROM "master_statuses" as "status"
        WHERE
          "status"."id" = "ThreadComments"."status_id"
      )`),
      'status_name',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "thread_comment_likes" as "likes"
          WHERE
            "likes"."thread_comment_id" = "ThreadComments"."id"
        )`),
        'int',
      ),
      'total_likes',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT CASE WHEN EXISTS (
            SELECT * FROM "thread_comment_likes" as "likes"
            WHERE
              "likes"."user_id" = ${user_id}
              AND "likes"."thread_comment_id" = "ThreadComments"."id"
          )
          THEN true
          ELSE false
          END
        )`),
        'boolean',
      ),
      'is_liked',
    ],
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT CASE WHEN EXISTS (
            SELECT * FROM "thread_comments" as "t"
            WHERE "t"."user_id" = ${user_id} AND "t"."id" = "ThreadComments"."id" )
            THEN true
            ELSE false
            END
        )`),
        'boolean',
      ),
      'is_my_comment',
    ],
  ]

  export function GetListThreadComment(
    user_id: number,
    props: Parameters<typeof ThreadComments.findAll>[0],
    whereThreadTenants?: WhereOptions,
  ) {
    return ThreadComments.findAndCountAll({
      ...props,
      include: relations(whereThreadTenants),
      attributes: { include: includeableThreadComments(user_id) },
      distinct: true,
    })
  }

  export function GetDetailThreadComment(
    user_id: number,
    where: WhereOptions<ThreadComments>,
    whereThreadTenants?: WhereOptions,
  ) {
    return ThreadComments.findOne({
      include: relations(whereThreadTenants),
      attributes: { include: includeableThreadComments(user_id) },
      where,
    })
  }

  export function CreateThreadComment(payload: CreationAttributes<ThreadComments>) {
    return ThreadComments.create(payload)
  }

  export function UpdateThreadComment(
    id: number,
    payload: { [key in keyof Attributes<ThreadComments>]?: Attributes<ThreadComments>[key] },
  ) {
    return ThreadComments.update(payload, { where: { id }, returning: true })
  }

  export function DeleteThreadComment(where: WhereOptions<ThreadComments>) {
    return ThreadComments.destroy({ where })
  }
}
