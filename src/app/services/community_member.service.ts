import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { CommunityMemberRepository } from 'app/repositories/community_member.repository'
import { Constant } from 'common/constants'
import { UserService } from './user.service'
import { NotificationService } from './notification.service'
import { LoggingService } from './logging.service'

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
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
          title: Constant.NOTIFICATION_TITLE_APPROVE_COMMUNITY_MEMBER,
          body: Constant.NOTIFICATION_BODY_APPROVE_COMMUNITY_MEMBER,
          user_ids: results.map((r) => r.user_id),
          data: { id: String(community_id) },
        })
        return baseResponse('Ok', { results })
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }
}
