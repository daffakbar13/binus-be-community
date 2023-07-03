import { ThreadController } from 'app/controllers/thread.controller'
import { ThreadDto } from 'app/dto/thread.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'
import { ThreadCommentRouter } from './thread_comment.routes'
import { ThreadLikeRouter } from './thread_like.routes'

const baseUrl = '/threads'
const router = Router()

router.get('/list', ThreadController.GetListThread)

router.get(
  '/detail/:id',
  ThreadDto.DetailThread,
  ErrorMiddleware.DtoValidator,
  ThreadController.GetDetailThread,
)

router.post(
  '/create',
  ThreadDto.CreateThread,
  ErrorMiddleware.DtoValidator,
  ThreadController.CreateThread,
)

router.put(
  '/update/:id',
  ThreadDto.CreateThread,
  ErrorMiddleware.DtoValidator,
  ThreadController.Update,
)

router.delete('/delete/:id', ThreadController.Delete)

export const ThreadRouter = Router().use(
  baseUrl,
  AuthMiddleware.checkAuthenticate,
  ThreadCommentRouter,
  ThreadLikeRouter,
  router,
)
