import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { SubCommunityMemberRepository } from 'app/repositories/sub_community_member.repository'
import { UserService } from './user.service'

export namespace SubCommunityMemberService {
  export async function GetSubCommunityMemberList(req: Request) {
    try {
      const { query } = req
      const sub_community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
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
              rows: result.data,
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
      const { user } = req.session
      if (user) {
        const [{ dataValues }] = await SubCommunityMemberRepository.RequestSubCommunityMember({
          sub_community_id,
          user_id: user.id,
        })
        return baseResponse('Ok', { ...dataValues, user })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function ApproveSubCommunityMember(req: Request) {
    try {
      const sub_community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
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
      const { user_ids } = req.body
      await SubCommunityMemberRepository.DeleteSubCommunityMember(sub_community_id, user_ids)
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function LeaveSubCommunityMember(req: Request) {
    try {
      const sub_community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
        await SubCommunityMemberRepository.LeaveSubCommunityMember({
          sub_community_id,
          user_id: user.id,
        })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
