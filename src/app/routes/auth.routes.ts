import { Router } from 'express'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { AuthController } from 'app/controllers/auth.controller'
import { AuthDto } from 'app/dto/auth.dto'

const router = Router()
const baseUrl = '/auth'

router.post('/login', AuthDto.Login, ErrorMiddleware.DtoValidator, AuthController.Login)

router.get('/sso-check', AuthController.SSOCheck)

export const AuthRouter = Router().use(baseUrl, router)
