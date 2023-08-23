import { CommunityController } from 'app/controllers/community.controller'
import { CommunityDto } from 'app/dto/community.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { UploadMiddleware } from 'app/middlewares/upload.middleware'
import { Router } from 'express'
import { CommunityMemberRouter } from './community_member.routes'

const router = Router()
const baseUrl = '/'

router.get(
  '/list',
  CommunityDto.GetCommunityList,
  ErrorMiddleware.DtoValidator,
  CommunityController.GetCommunityList,
)

router.get(
  '/detail/:id',
  CommunityDto.GetCommunityDetail,
  ErrorMiddleware.DtoValidator,
  CommunityController.GetCommunityDetail,
)

router.post(
  '/create',
  UploadMiddleware.uploadFile('.svg', '.png', '.jpeg', '.jpg').single('image'),
  CommunityDto.CreateCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.CreateCommunity,
)

router.put(
  '/update/:id',
  UploadMiddleware.uploadFile('.svg', '.png', '.jpeg', '.jpg').single('image'),
  CommunityDto.UpdateCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.UpdateCommunity,
)

router.delete(
  '/delete/:id',
  CommunityDto.DeleteCommunity,
  ErrorMiddleware.DtoValidator,
  CommunityController.DeleteCommunity,
)

export const CommunityRouter = Router().use(
  baseUrl,
  AuthMiddleware.checkAuthenticate,
  router,
  CommunityMemberRouter,
)
