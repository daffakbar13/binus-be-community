import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { ThreadSettingDto } from 'app/dto/thread_setting.dto'
import { ThreadSettingController } from 'app/controllers/thread_setting.controller'

import { Router } from 'express'

const router = Router()
const baseUrl = '/thread_setting'

router.get(
  '/list',
  ThreadSettingDto.GetThreadSettingList,
  ErrorMiddleware.DtoValidator,
  ThreadSettingController.GetThreadSettingList,
)

router.patch(
  '/:id/update',
  ThreadSettingDto.UpdateThreadSetting,
  ErrorMiddleware.DtoValidator,
  ThreadSettingController.UpdateThreadSetting,
)

export const ThreadSettingRouter = Router().use(baseUrl, router)
