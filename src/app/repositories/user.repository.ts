import { Communities } from 'app/models/communities'
import { CommunityMembers } from 'app/models/community_members'
import { ThreadTenants } from 'app/models/thread_tenants'
import { Threads } from 'app/models/threads'
import {
  Includeable,
  ProjectionAlias,
  Sequelize,
} from 'sequelize'

export namespace UserRepository {
  const relations: Includeable[] = [
    {
      model: ThreadTenants,
      as: 'tenants',
      required: true,
    },
  ]
  const relationsCommunities: Includeable[] = [
    {
      model: Communities,
      as: 'community',
      required: true,
    },
  ]
  const includeableThreads = (user_id: number): (string | ProjectionAlias)[] => [
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "thread_tenants" as "tenants"
          WHERE
            "tenants"."thread_id" = "Threads"."id"
            AND "Threads"."user_id" = ${user_id}
        )`),
        'int',
      ),
      'total_threads',
    ],
  ]

  const includeableCommunities = (user_id: number): (string | ProjectionAlias)[] => [
    [
      Sequelize.cast(
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "communities" as "community"
          WHERE
            "community"."id" = "CommunityMembers"."community_id"
            AND "CommunityMembers"."user_id" = ${user_id}
        )`),
        'int',
      ),
      'total_communities',
    ],
  ]

  export function GetTotalThreads(
    user_id: number,
    props: Parameters<typeof Threads.findAll>[0],
  ) {
    return Threads.findAll({
      ...props,
      include: relations,
      attributes: { include: includeableThreads(user_id) },
    })
  }

  export function GetTotalCommunities(
    user_id: number,
    props: Parameters<typeof CommunityMembers.findAll>[0],
  ) {
    return CommunityMembers.findAll({
      ...props,
      include: relationsCommunities,
      attributes: { include: includeableCommunities(user_id) },
    })
  }
}
