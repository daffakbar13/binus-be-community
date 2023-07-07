import { SubCommunityController } from 'app/controllers/sub_community.controller'
import { SubCommunityDto } from 'app/dto/sub_community.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { UploadMiddleware } from 'app/middlewares/upload.middleware'
import { Router } from 'express'

const router = Router()
const baseUrl = '/sub-communities'

router.get(
  '/list',
  SubCommunityDto.ListSubCommunity,
  ErrorMiddleware.DtoValidator,
  SubCommunityController.GetListSubCommunity,
)

router.get(
  '/detail/:id',
  SubCommunityDto.DetailSubCommunity,
  ErrorMiddleware.DtoValidator,
  SubCommunityController.GetDetailSubCommunity,
)

router.post(
  '/create',
  UploadMiddleware.uploadFile('.svg').single('image'),
  SubCommunityDto.CreateSubCommunity,
  ErrorMiddleware.DtoValidator,
  SubCommunityController.CreateSubCommunity,
)

router.put(
  '/update/:id',
  UploadMiddleware.uploadFile('.svg').single('image'),
  SubCommunityDto.UpdateSubCommunity,
  ErrorMiddleware.DtoValidator,
  SubCommunityController.Update,
)

router.delete(
  '/delete/:id',
  SubCommunityDto.DeleteSubCommunity,
  ErrorMiddleware.DtoValidator,
  SubCommunityController.Delete,
)

export const SubCommunityRouter = Router().use(baseUrl, AuthMiddleware.checkAuthenticate, router)
