import { Router } from 'express'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { UserController } from 'app/controllers/user.controller'

const router = Router()
const baseUrl = '/user'

router.get('/info', UserController.UserInfo)

router.get('/list', UserController.UserInfo)

router.get('/detail:id', UserController.UserInfo)

export const UserRouter = Router().use(baseUrl, AuthMiddleware.checkAuthenticate, router)
