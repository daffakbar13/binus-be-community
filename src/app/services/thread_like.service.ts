import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadLikeRepository } from 'app/repositories/thread_like.repository'
import { UserService } from './user.service'

export namespace ThreadLikeService {
  export async function LikeThread(req: Request) {
    try {
      const id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await ThreadLikeRepository.CreateThreadLike({
          thread_id: Number(id),
          user_id: user.data.id,
        })
        const count = await CountLike(id)
        return baseResponse('Ok', { count })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UnlikeThread(req: Request) {
    try {
      const id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await ThreadLikeRepository.DeleteThreadLike({ user_id: user.data.id, thread_id: id })
        const count = await CountLike(id)
        return baseResponse('Ok', { count })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export function CountLike(thread_id: number) {
    return ThreadLikeRepository.CountThreadLike({ thread_id })
  }
}
