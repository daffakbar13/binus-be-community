import { ThreadCommentRepository } from 'app/repositories/thread_comment.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { UserService } from './user.service'

export namespace ThreadCommentService {
  export async function CreateThreadComment(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const result = await ThreadCommentRepository.CreateThreadComment({
          ...req.body,
          user_id: user.data.id,
        })
        return baseResponse('Ok', result)
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
        await ThreadCommentRepository.UpdateThreadComment(Number(req.params.id), {
          ...req.body,
          user_id: user.data.id,
        })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
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
