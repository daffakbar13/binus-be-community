import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { SubCommunityMemberRepository } from 'app/repositories/sub_community_member.repository'
import { SubCommunityMembers } from 'app/models/sub_community_members'
import { UserService } from './user.service'

export namespace SubCommunityMemberService {
  export async function GetSubCommunityMemberList(req: Request) {
    try {
      const { query } = req
      const sub_community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const pagination = paginationObject(query)
        const { count, rows } = await SubCommunityMemberRepository.GetSubCommunityMemberList({
          ...pagination,
          where: {
            sub_community_id,
            ...(query.is_approved && { is_approved: query.is_approved }),
          },
        })
        const result = await UserService.GetMappedUsers(req, rows)
        if (result.data) {
          return baseResponse(
            'Ok',
            responseWithPagination({
              count,
              rows: result.data as Array<SubCommunityMembers>,
              ...pagination,
            }),
          )
        }
        return result
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function RequestSubCommunityMember(req: Request) {
    try {
      const sub_community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [{ dataValues }] = await SubCommunityMemberRepository.RequestSubCommunityMember({
          sub_community_id,
          user_id: user.data.id,
          is_approved: false,
        })
        return baseResponse('Ok', { ...dataValues, user: user.data })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function ApproveSubCommunityMember(req: Request) {
    try {
      const sub_community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [, results] = await SubCommunityMemberRepository.ApproveSubCommunityMember(
          sub_community_id,
          req.body.user_ids,
        )
        return baseResponse('Ok', { results })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteSubCommunityMember(req: Request) {
    try {
      const sub_community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await SubCommunityMemberRepository.DeleteSubCommunityMember({
          sub_community_id,
          user_id: user.data.id,
        })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
