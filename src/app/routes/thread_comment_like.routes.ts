import { ThreadCommentLikeController } from 'app/controllers/thread_comment_like.controller'
import { ThreadCommentLikeDto } from 'app/dto/thread_comment_like.dto'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()

router.post(
  '/:id/like',
  ThreadCommentLikeDto.LikeThreadComment,
  ErrorMiddleware.DtoValidator,
  ThreadCommentLikeController.Like,
)

router.delete(
  '/:id/like',
  ThreadCommentLikeDto.LikeThreadComment,
  ErrorMiddleware.DtoValidator,
  ThreadCommentLikeController.Unlike,
)

export const ThreadCommentLikeRouter = router
