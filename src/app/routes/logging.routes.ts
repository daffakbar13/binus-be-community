import { Router } from 'express'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { LoggingDto } from 'app/dto/logging.dto'
import { LoggingController } from 'app/controllers/logging.controller'

const router = Router()

router.get(
  '/:xid',
  LoggingDto.GetLogging,
  ErrorMiddleware.DtoValidator,
  LoggingController.GetLogging,
)

export const LoggingRouter = Router().use('/logs', router)
