import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadLikeRepository } from 'app/repositories/thread_like.repository'
import { UserService } from './user.service'

export namespace ThreadLikeService {
  export async function LikeThread(req: Request) {
    try {
      const { id } = req.params
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const isLiked = await ThreadLikeRepository.GetDetailThreadLike({
          thread_id: id,
          user_id: user.data.id,
        })
        if (!isLiked) {
          await ThreadLikeRepository.CreateThreadLike({
            thread_id: Number(id),
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

  export async function UnlikeThread(req: Request) {
    try {
      const { id } = req.params
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await ThreadLikeRepository.DeleteThreadLike({ user_id: user.data.id, thread_id: id })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
