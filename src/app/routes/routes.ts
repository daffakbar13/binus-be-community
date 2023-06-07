import { Router } from 'express'
import { AuthRouter } from './auth.routes'

const router = Router()

router.use(AuthRouter)

export const AppRouter = Router().use('/v1', router)
