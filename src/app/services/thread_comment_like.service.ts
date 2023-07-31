import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadCommentLikeRepository } from 'app/repositories/thread_comment_like.repository'

export namespace ThreadCommentLikeService {
  export async function LikeThreadComment(req: Request) {
    try {
      const id = Number(req.params.id)
      const { user } = req.session
      if (user) {
        await ThreadCommentLikeRepository.CreateThreadCommentLike({
          thread_comment_id: id,
          user_id: user.id,
        })
        const count = await CountLike(id)
        return baseResponse('Ok', { count })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UnlikeThreadComment(req: Request) {
    try {
      const id = Number(req.params.id)
      const { user } = req.session
      if (user) {
        await ThreadCommentLikeRepository.DeleteThreadCommentLike({
          user_id: user.id,
          thread_comment_id: id,
        })
        const count = await CountLike(id)
        return baseResponse('Ok', { count })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export function CountLike(thread_comment_id: number) {
    return ThreadCommentLikeRepository.CountThreadCommentLike({
      thread_comment_id,
    })
  }
}
