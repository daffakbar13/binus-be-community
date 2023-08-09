import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadLikeRepository } from 'app/repositories/thread_like.repository'
import { NotificationService } from './notification.service'
import { UserService } from './user.service'

export namespace ThreadLikeService {
  export async function LikeThread(req: Request) {
    try {
      const id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const result = await ThreadLikeRepository.CreateThreadLike({
          thread_id: Number(id),
          user_id: user.data.id,
        })
        const count = await CountLike(id)
        await NotificationService.CreateNotification(req, {
          recipient_type: 'specific-user',
          title: 'Thread Like',
          body: `${user.data.name} liked your thread`,
          type_id: NotificationService.NotificationTypes.THREAD,
          user_ids: [result.thread.user_id],
          data: { id: String(result.thread.id) },
        })
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
      const { user } = req.session
      if (user) {
        await ThreadLikeRepository.DeleteThreadLike({ user_id: user.id, thread_id: id })
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
