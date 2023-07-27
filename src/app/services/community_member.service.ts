import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { CommunityMemberRepository } from 'app/repositories/community_member.repository'
import { CommunityMembers } from 'app/models/community_members'
import { UserService } from './user.service'

export namespace CommunityMemberService {
  export async function GetCommunityMemberList(req: Request) {
    try {
      const { query } = req
      const community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const pagination = paginationObject(query)
        const { count, rows } = await CommunityMemberRepository.GetCommunityMemberList({
          ...pagination,
          where: {
            community_id,
            ...(query.is_approved && { is_approved: query.is_approved }),
          },
        })
        const result = await UserService.GetMappedUsers(req, rows)
        if (result.data) {
          return baseResponse(
            'Ok',
            responseWithPagination({
              count,
              rows: result.data as Array<CommunityMembers>,
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

  export async function RequestCommunityMember(req: Request) {
    try {
      const community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [{ dataValues }] = await CommunityMemberRepository.RequestCommunityMember({
          community_id,
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

  export async function ApproveCommunityMember(req: Request) {
    try {
      const community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [, results] = await CommunityMemberRepository.ApproveCommunityMember(
          community_id,
          req.body.user_ids,
        )
        return baseResponse('Ok', { results })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteCommunityMember(req: Request) {
    try {
      const community_id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await CommunityMemberRepository.DeleteCommunityMember({
          community_id,
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
