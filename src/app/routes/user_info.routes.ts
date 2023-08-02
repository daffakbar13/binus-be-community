import { UserController } from 'app/controllers/user.controller'
import { AuthMiddleware } from 'app/middlewares/auth.middleware'
import { Router } from 'express'

const router = Router()
const baseUrl = '/users'

router.get(
  '/info',
  UserController.GetUserInfo,
)
export const UserInfoRouter = Router().use(
  baseUrl,
  AuthMiddleware.checkAuthenticate,
  router,
)
