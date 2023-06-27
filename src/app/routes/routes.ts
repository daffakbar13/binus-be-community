import { Router } from 'express'
import { BannerRouter } from './banner.routes'
import { ThreadRouter } from './thread.routes'

const router = Router()

router.use(BannerRouter)

router.use(ThreadRouter)

export const AppRouter = router
