import { ThreadLikeController } from 'app/controllers/thread_like.controller'
import { ThreadLikeDto } from 'app/dto/thread_like.dto'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()

router.post(
  '/:id/like',
  ThreadLikeDto.LikeThread,
  ErrorMiddleware.DtoValidator,
  ThreadLikeController.Like,
)

router.delete(
  '/:id/like',
  ThreadLikeDto.LikeThread,
  ErrorMiddleware.DtoValidator,
  ThreadLikeController.Unlike,
)

export const ThreadLikeRouter = router
