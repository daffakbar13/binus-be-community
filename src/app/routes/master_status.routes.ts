import { MasterStatusController } from 'app/controllers/master_status.controller'
import { MasterStatusDto } from 'app/dto/master_status.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()
const baseUrl = '/statuses'

router.get('/list', MasterStatusController.GetListMasterStatus)

router.get(
  '/detail/:id',
  MasterStatusDto.GetMasterStatusDetail,
  ErrorMiddleware.DtoValidator,
  MasterStatusController.GetMasterStatusDetail,
)

export const MasterStatusRouter = Router().use(baseUrl, AuthMiddleware.checkAuthenticate, router)
