import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { SubCommunityMemberRepository } from 'app/repositories/sub_community_member.repository'
import { Constant } from 'common/constants'
import { UserService } from './user.service'
import { NotificationService } from './notification.service'
import { LoggingService } from './logging.service'

export namespace SubCommunityMemberService {
  export async function GetAllSubCommunityMember(req: Request) {
    try {
      const { params, query } = req
      const community_id = Number(params.id)
      const result = await SubCommunityMemberRepository.GetAllSubCommunityMember({
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
        await NotificationService.CreateNotification(req, {
          recipient_type: 'specific-user',
          type_id: NotificationService.NotificationTypes.SUBCOMMUNITY,
          title: Constant.NOTIFICATION_TITLE_APPROVE_SUB_COMMUNITY_MEMBER,
          body: Constant.NOTIFICATION_BODY_APPROVE_SUB_COMMUNITY_MEMBER,
          user_ids: results.map((r) => r.user_id),
          data: { id: String(sub_community_id) },
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

  export async function CancelSubCommunityMember(req: Request) {
    try {
      const sub_community_id = Number(req.params.id)
      const { user } = req.session
      if (user) {
        await SubCommunityMemberRepository.CancelSubCommunityMember(sub_community_id, user.id)

        return baseResponse('Ok')
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }
}
