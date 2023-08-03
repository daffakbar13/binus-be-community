import { CommunityMembers } from 'app/models/community_members'
import { CreationAttributes, Op, WhereOptions } from 'sequelize'

export namespace CommunityMemberRepository {
  const relations = ['community']

  export async function GetAllCommunityMember(
    props: Parameters<typeof CommunityMembers.findAll>[0],
  ) {
    return CommunityMembers.findAll(props)
  }

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

  export function RequestCommunityMember(payload: CreationAttributes<CommunityMembers>) {
    return CommunityMembers.findOrCreate({
      where: payload,
      defaults: payload,
      returning: true,
    })
  }

  export function ApproveCommunityMember(community_id: number, user_ids: number[]) {
    return CommunityMembers.update(
      { is_approved: true },
      { where: { community_id, user_id: { [Op.or]: user_ids } }, returning: true },
    )
  }

  export function DeleteCommunityMember(community_id: number, user_ids: number[]) {
    return CommunityMembers.destroy({
      where: { community_id, user_id: { [Op.or]: user_ids } },
    })
  }

  export function LeaveCommunityMember(where: CreationAttributes<CommunityMembers>) {
    return CommunityMembers.destroy({ where })
  }
}
