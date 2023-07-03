import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadCommentLikeRepository } from 'app/repositories/thread_comment_like.repository'
import { UserService } from './user.service'

export namespace ThreadCommentLikeService {
  export async function LikeThreadComment(req: Request) {
    try {
      const { id } = req.params
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const isLiked = await ThreadCommentLikeRepository.GetDetailThreadCommentLike({
          thread_comment_id: id,
          user_id: user.data.id,
        })
        if (!isLiked) {
          await ThreadCommentLikeRepository.CreateThreadCommentLike({
            thread_comment_id: Number(id),
            user_id: user.data.id,
          })
        }
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UnlikeThreadComment(req: Request) {
    try {
      const { id } = req.params
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await ThreadCommentLikeRepository.DeleteThreadCommentLike({
          user_id: user.data.id,
          thread_comment_id: id,
        })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
