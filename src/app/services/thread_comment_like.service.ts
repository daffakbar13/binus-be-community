import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { ThreadCommentLikeRepository } from 'app/repositories/thread_comment_like.repository'
import { Constant } from 'common/constants'
import { format } from 'util'
import { NotificationService } from './notification.service'
import { UserService } from './user.service'
import { LoggingService } from './logging.service'

export namespace ThreadCommentLikeService {
  export async function LikeThreadComment(req: Request) {
    try {
      const id = Number(req.params.id)
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const [result, isLike] = await ThreadCommentLikeRepository.CreateThreadCommentLike({
          thread_comment_id: id,
          user_id: user.data.id,
        })
        const count = await CountLike(id)
        const isMyThread = result.comment.thread.user_id === user.data.id
        if (isLike && !isMyThread) {
          await NotificationService.CreateNotification(req, {
            recipient_type: 'specific-user',
            title: Constant.NOTIFICATION_TITLE_COMMENT_LIKE_THREAD,
            body: format(Constant.NOTIFICATION_BODY_COMMENT_LIKE_THREAD, user.data.name),
            type_id: NotificationService.NotificationTypes.THREAD,
            user_ids: [result.comment.user_id],
            data: { id: String(result.comment.thread.id) },
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
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export function CountLike(thread_comment_id: number) {
    return ThreadCommentLikeRepository.CountThreadCommentLike({
      thread_comment_id,
    })
  }
}
