import { ThreadCommentController } from 'app/controllers/thread_comment.controller'
import { ThreadCommentDto } from 'app/dto/thread_comment.dto'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'
import { ThreadCommentLikeRouter } from './thread_comment_like.routes'

const router = Router()
const baseUrl = '/comments'

router.get('/list', ThreadCommentController.GetListThreadComment)

router.post(
  '/create',
  ThreadCommentDto.CreateThreadComment,
  ErrorMiddleware.DtoValidator,
  ThreadCommentController.CreateThreadComment,
)

router.put(
  '/update/:id',
  ThreadCommentDto.UpdateThreadComment,
  ErrorMiddleware.DtoValidator,
  ThreadCommentController.UpdateThreadComment,
)

router.get(
  '/detail/:id',
  ThreadCommentDto.DetailThreadComment,
  ErrorMiddleware.DtoValidator,
  ThreadCommentController.GetDetailThreadComment,
)

router.post(
  '/:id/approval',
  ThreadCommentDto.CommentApproval,
  ErrorMiddleware.DtoValidator,
  ThreadCommentController.CommentApproval,
)

router.delete(
  '/delete/:id',
  ThreadCommentDto.DeleteThreadComment,
  ErrorMiddleware.DtoValidator,
  ThreadCommentController.DeleteThreadComment,
)

export const ThreadCommentRouter = Router().use(baseUrl, router, ThreadCommentLikeRouter)
