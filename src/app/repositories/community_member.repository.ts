import { CommunityMembers } from 'app/models/community_members'
import { CreationAttributes, Op, WhereOptions } from 'sequelize'

export namespace CommunityMemberRepository {
  const relations = ['community']

  export async function GetCommunityMemberList(
    props: Parameters<typeof CommunityMembers.findAll>[0],
  ) {
    return CommunityMembers.findAndCountAll({
      ...props,
      include: relations,
      distinct: true,
    })
  }

  export function GetCommunityMemberDetail(where: WhereOptions<CommunityMembers>) {
    return CommunityMembers.findOne({
      include: relations,
      where,
    })
  }

  export function RequestCommunityMember(defaults: CreationAttributes<CommunityMembers>) {
    const { user_id, community_id } = defaults
    return CommunityMembers.findOrCreate({
      where: { user_id, community_id },
      defaults,
      returning: true,
    })
  }

  export function ApproveCommunityMember(community_id: number, user_ids: number[]) {
    return CommunityMembers.update(
      { is_approved: true },
      { where: { community_id, user_id: { [Op.or]: user_ids } }, returning: true },
    )
  }

  export function DeleteCommunityMember(where: WhereOptions<CommunityMembers>) {
    return CommunityMembers.destroy({ where })
  }
}
