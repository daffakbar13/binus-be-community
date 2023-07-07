import { CommunityController } from 'app/controllers/community.controller'
import { CommunityDto } from 'app/dto/community.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { UploadMiddleware } from 'app/middlewares/upload.middleware'
import { Router } from 'express'

const router = Router()

router.get(
  '/list',
  CommunityDto.ListCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.GetListCommunity,
)

router.get(
  '/detail/:id',
  CommunityDto.DetailCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.GetDetailCommunity,
)

router.post(
  '/create',
  UploadMiddleware.uploadFile('.svg').single('image'),
  CommunityDto.CreateCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.CreateCommunity,
)

router.put(
  '/update/:id',
  UploadMiddleware.uploadFile('.svg').single('image'),
  CommunityDto.UpdateCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.Update,
)

router.delete(
  '/delete/:id',
  CommunityDto.DeleteCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.Delete,
)

export const CommunityRouter = Router().use(AuthMiddleware.checkAuthenticate, router)
