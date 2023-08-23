import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadLikeRepository } from 'app/repositories/thread_like.repository'
import { Constant } from 'common/constants'
import { format } from 'util'
import { NotificationService } from './notification.service'
import { UserService } from './user.service'
import { LoggingService } from './logging.service'

export namespace ThreadLikeService {
  export async function LikeThread(req: Request) {
    try {
      const id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [result, isLike] = await ThreadLikeRepository.CreateThreadLike({
          thread_id: Number(id),
          user_id: user.data.id,
        })
        const count = await CountLike(id)
        const isMyThread = result.thread.user_id === user.data.id
        if (isLike && !isMyThread) {
          await NotificationService.CreateNotification(req, {
            recipient_type: 'specific-user',
            title: Constant.NOTIFICATION_TITLE_LIKE_THREAD,
            body: format(Constant.NOTIFICATION_BODY_LIKE_THREAD, user.data.name),
            type_id: NotificationService.NotificationTypes.THREAD,
            user_ids: [result.thread.user_id],
            data: { id: String(result.thread.id) },
          })
        }
        return baseResponse('Ok', { count })
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export function CountLike(thread_id: number) {
    return ThreadLikeRepository.CountThreadLike({ thread_id })
  }
}
