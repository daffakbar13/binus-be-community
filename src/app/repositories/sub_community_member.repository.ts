import { SubCommunityMembers } from 'app/models/sub_community_members'
import { CreationAttributes, Op, WhereOptions } from 'sequelize'

export namespace SubCommunityMemberRepository {
  const relations = ['sub_community']

  export async function GetAllSubCommunityMember(
    props: Parameters<typeof SubCommunityMembers.findAll>[0],
  ) {
    return SubCommunityMembers.findAll(props)
  }

  export async function GetSubCommunityMemberList(
    props: Parameters<typeof SubCommunityMembers.findAll>[0],
  ) {
    return SubCommunityMembers.findAndCountAll({
      ...props,
      include: relations,
      distinct: true,
    })
  }

  export function GetSubCommunityMemberDetail(where: WhereOptions<SubCommunityMembers>) {
    return SubCommunityMembers.findOne({
      include: relations,
      where,
    })
  }

  export function RequestSubCommunityMember(payload: CreationAttributes<SubCommunityMembers>) {
    return SubCommunityMembers.findOrCreate({
      where: payload,
      defaults: payload,
      returning: true,
    })
  }

  export function ApproveSubCommunityMember(sub_community_id: number, user_ids: number[]) {
    return SubCommunityMembers.update(
      { is_approved: true },
      { where: { sub_community_id, user_id: { [Op.or]: user_ids } }, returning: true },
    )
  }

  export function CancelSubCommunityMember(sub_community_id: number, user_ids: number) {
    return SubCommunityMembers.destroy({
      where: { sub_community_id, user_id: user_ids },
    })
  }

  export function DeleteSubCommunityMember(sub_community_id: number, user_ids: number[]) {
    return SubCommunityMembers.destroy({
      where: { sub_community_id, user_id: { [Op.or]: user_ids } },
    })
  }

  export function LeaveSubCommunityMember(where: CreationAttributes<SubCommunityMembers>) {
    return SubCommunityMembers.destroy({ where })
  }
}
