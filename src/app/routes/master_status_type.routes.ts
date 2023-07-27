import { MasterStatusTypeController } from 'app/controllers/master_status_type.controller'
import { MasterStatusTypeDto } from 'app/dto/master_status_type.dto'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()
const baseUrl = '/status-types'

router.get('/list', MasterStatusTypeController.GetListMasterStatusType)

router.get(
  '/detail/:id',
  MasterStatusTypeDto.GetMasterStatusTypeDetail,
  ErrorMiddleware.DtoValidator,
  MasterStatusTypeController.GetMasterStatusTypeDetail,
)

export const MasterStatusTypeRouter = Router().use(
  baseUrl,
  AuthMiddleware.checkAuthenticate,
  router,
)
