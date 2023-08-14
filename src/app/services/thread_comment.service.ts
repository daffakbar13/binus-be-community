import { ThreadCommentRepository } from 'app/repositories/thread_comment.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { MasterStatusRepository } from 'app/repositories/master_status.repository'
import { sortRequest } from 'utils/helpers/sort'
import { Constant } from 'common/constants'
import { format } from 'util'
import { UserService } from './user.service'
import { TenantService } from './tenant.service'
import { NotificationService } from './notification.service'

export namespace ThreadCommentService {
  export async function GetListThreadComment(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const { query } = req
        const pagination = paginationObject(query)
        const order = sortRequest(query)
        const { count, rows } = await ThreadCommentRepository.GetListThreadComment(
          user.id,
          {
            ...pagination,
            order,
            where: {
              ...(query.thread_id && { thread_id: query.thread_id }),
              ...(query.status_id && { status_id: query.status_id }),
            },
          },
          {
            ...(query.tenant_uuid && { tenant_uuid: query.tenant_uuid }),
          },
        )
        const result = await UserService.GetMappedUsers(req, rows, ['thread'])
        const tenant = await TenantService.GetMappedTenant(req, result.data)

        if (tenant.data) {
          return baseResponse(
            'Ok',
            responseWithPagination({ count, rows: tenant.data, ...pagination }),
          )
        }
        return result
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateThreadComment(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const result = await ThreadCommentRepository.CreateThreadComment({
          ...req.body,
          user_id: user.data.id,
          status_id: 1,
        })
        const isMyThread = result.thread.user_id === user.data.id
        if (!isMyThread) {
          await NotificationService.CreateNotification(req, {
            recipient_type: 'specific-user',
            title: Constant.NOTIFICATION_TITLE_COMMENT_THREAD,
            body: format(Constant.NOTIFICATION_BODY_COMMENT_THREAD, user.data.name),
            type_id: NotificationService.NotificationTypes.THREAD,
            user_ids: [result.thread.user_id],
            data: { id: String(result.thread.id) },
          })
        }
        return baseResponse('Ok', { ...result.dataValues, user: user.data })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailThreadComment(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const comment = await ThreadCommentRepository.GetDetailThreadComment(user.id, {
          id: req.params.id,
        })
        if (comment) {
          const result = await UserService.GetMappedUsers(req, comment, ['thread'])
          return result
        }
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateThreadComment(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const [isUpdated, [result]] = await ThreadCommentRepository.UpdateThreadComment(
          Number(req.params.id),
          {
            ...req.body,
            user_id: user.id,
          },
        )

        return baseResponse('Ok', isUpdated ? { ...result.dataValues, user } : null)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CommentApproval(req: Request) {
    try {
      const { status_id } = req.body
      const status = await MasterStatusRepository.GetMasterStatusDetail({ id: status_id })
      if (status) {
        const [, [result]] = await ThreadCommentRepository.UpdateThreadComment(
          Number(req.params.id),
          req.body,
        )
        return baseResponse('Ok', result)
      }
      return baseResponse('BadRequest')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteThreadComment(req: Request) {
    try {
      const { id } = req.params
      await ThreadCommentRepository.DeleteThreadComment({ id })
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
