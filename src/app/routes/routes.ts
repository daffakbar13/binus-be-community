import { Router } from 'express'
import { AuthRouter } from './auth.routes'
import { UserRouter } from './user.routes'

const router = Router()

router.use(AuthRouter)

router.use(UserRouter)

export const AppRouter = Router().use('/v1', router)
