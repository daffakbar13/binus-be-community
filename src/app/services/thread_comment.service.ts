import { ThreadCommentRepository } from 'app/repositories/thread_comment.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { MasterStatusRepository } from 'app/repositories/master_status.repository'
import { sortRequest } from 'utils/helpers/sort'
import { UserService } from './user.service'

export namespace ThreadCommentService {
  export async function GetListThreadComment(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const { query } = req
        const pagination = paginationObject(query)
        const order = sortRequest(query)
        const { count, rows } = await ThreadCommentRepository.GetListThreadComment(user.data.id, {
          ...pagination,
          order,
          where: {
            ...(query.thread_id && { thread_id: query.thread_id }),
            ...(query.status_id && { status_id: query.status_id }),
            ...(query.tenant_uuid && { tenant_uuid: query.tenant_uuid }),
          },
        })
        const result = await UserService.GetMappedUsers(req, rows, ['thread'])
        if (result.data) {
          return baseResponse(
            'Ok',
            responseWithPagination({ count, rows: result.data, ...pagination }),
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
        const { dataValues } = await ThreadCommentRepository.CreateThreadComment({
          ...req.body,
          user_id: user.data.id,
          status_id: 1,
        })
        return baseResponse('Ok', { ...dataValues, user: user.data })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailThreadComment(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const comment = await ThreadCommentRepository.GetDetailThreadComment(user.data.id, {
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
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [isUpdated, [result]] = await ThreadCommentRepository.UpdateThreadComment(
          Number(req.params.id),
          {
            ...req.body,
            user_id: user.data.id,
          },
        )

        return baseResponse('Ok', isUpdated ? { ...result.dataValues, user: user.data } : null)
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
