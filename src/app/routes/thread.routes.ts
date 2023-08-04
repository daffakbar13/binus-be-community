import { ThreadController } from 'app/controllers/thread.controller'
import { ThreadDto } from 'app/dto/thread.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'
import { ThreadCommentRouter } from './thread_comment.routes'
import { ThreadLikeRouter } from './thread_like.routes'
import { ThreadSettingRouter } from './thread_setting.routes'

const baseUrl = '/threads'
const router = Router()

router.get(
  '/list',
  ThreadDto.GetThreadList,
  ErrorMiddleware.DtoValidator,
  ThreadController.GetListThread,
)

router.get(
  '/my-threads/list',
  ThreadDto.GetMyThreadList,
  ErrorMiddleware.DtoValidator,
  ThreadController.GetMyThreads,
)

router.get(
  '/detail/:id',
  ThreadDto.GetThreadDetail,
  ErrorMiddleware.DtoValidator,
  ThreadController.GetDetailThread,
)

router.post(
  '/create',
  ThreadDto.CreateThread,
  ErrorMiddleware.DtoValidator,
  ThreadController.CreateThread,
)

router.post(
  '/:id/approval',
  ThreadDto.ThreadApproval,
  ErrorMiddleware.DtoValidator,
  ThreadController.ThreadApproval,
)

router.put(
  '/update/:id',
  ThreadDto.UpdateThread,
  ErrorMiddleware.DtoValidator,
  ThreadController.Update,
)

router.delete(
  '/delete/:id',
  ThreadDto.DeleteThread,
  ErrorMiddleware.DtoValidator,
  ThreadController.Delete,
)

export const ThreadRouter = Router().use(
  baseUrl,
  AuthMiddleware.checkAuthenticate,
  ThreadCommentRouter,
  ThreadLikeRouter,
  ThreadSettingRouter,
  router,
)
