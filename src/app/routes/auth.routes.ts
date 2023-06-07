import { Router } from 'express'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { AuthController } from 'app/controllers/auth.controller'
import { AuthDto } from 'app/dto/auth.dto'

const router = Router()

router.post('/login', AuthDto.Login, ErrorMiddleware.DtoValidator, AuthController.login)

export const AuthRouter = Router().use('/auth', router)
