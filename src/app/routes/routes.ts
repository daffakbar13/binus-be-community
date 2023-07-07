import { Router } from 'express'
import { BannerRouter } from './banner.routes'
import { ThreadRouter } from './thread.routes'
import { CommunityRouter } from './community.routes'
import { SubCommunityRouter } from './sub_community.routes'

const router = Router()

router.use(CommunityRouter)

router.use(SubCommunityRouter)

router.use(BannerRouter)

router.use(ThreadRouter)

export const AppRouter = router
