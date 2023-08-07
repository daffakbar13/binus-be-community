import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { CommunityMemberRepository } from 'app/repositories/community_member.repository'
import { UserService } from './user.service'
import { NotificationService } from './notification.service'

export namespace CommunityMemberService {
  export async function GetAllCommunityMember(req: Request) {
    try {
      const { params, query } = req
      const community_id = Number(params.id)
      const result = await CommunityMemberRepository.GetAllCommunityMember({
        where: {
          community_id,
          ...(query.is_approved && { is_approved: query.is_approved }),
        },
      })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetCommunityMemberList(req: Request) {
    try {
      const { query } = req
      const community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
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

  export async function RequestCommunityMember(req: Request) {
    try {
      const community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
        const [{ dataValues }] = await CommunityMemberRepository.RequestCommunityMember({
          community_id,
          user_id: user.id,
        })
        return baseResponse('Ok', { ...dataValues, user })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function ApproveCommunityMember(req: Request) {
    try {
      const community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
        const [, results] = await CommunityMemberRepository.ApproveCommunityMember(
          community_id,
          req.body.user_ids,
        )
        await NotificationService.CreateNotification(req, {
          recipient_type: 'specific-user',
          type_id: NotificationService.NotificationTypes.COMMUNITY,
          title: 'Join Community Approved',
          body: 'Your request join has been approved',
          user_ids: results.map((r) => r.user_id),
          data: { id: String(community_id) },
        })
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
      const { user_ids } = req.body
      await CommunityMemberRepository.DeleteCommunityMember(community_id, user_ids)
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function LeaveCommunityMember(req: Request) {
    try {
      const community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
        await CommunityMemberRepository.LeaveCommunityMember({
          community_id,
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
