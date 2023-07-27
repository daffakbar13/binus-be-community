import { BannerController } from 'app/controllers/banner.controller'
import { BannerDto } from 'app/dto/banner.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { UploadMiddleware } from 'app/middlewares/upload.middleware'
import { Router } from 'express'

const router = Router()
const baseUrl = '/banners'

router.get(
  '/list',
  BannerDto.GetBannerList,
  ErrorMiddleware.DtoValidator,
  BannerController.GetBannerList,
)

router.get(
  '/detail/:id',
  BannerDto.GetBannerDetail,
  ErrorMiddleware.DtoValidator,
  BannerController.GetBannerDetail,
)

router.post(
  '/create',
  UploadMiddleware.uploadFile('.png', '.jpg').single('image'),
  BannerDto.CreateBanner,
  ErrorMiddleware.DtoValidator,
  BannerController.CreateBanner,
)

router.put(
  '/update/:id',
  UploadMiddleware.uploadFile('.png', '.jpg').single('image'),
  BannerDto.UpdateBanner,
  ErrorMiddleware.DtoValidator,
  BannerController.UpdateBanner,
)

router.delete(
  '/delete/:id',
  BannerDto.DeleteBanner,
  ErrorMiddleware.DtoValidator,
  BannerController.DeleteBanner,
)

export const BannerRouter = Router().use(baseUrl, AuthMiddleware.checkAuthenticate, router)
