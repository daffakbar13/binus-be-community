import { Router } from 'express'
import { BannerRouter } from './banner.routes'
import { ThreadRouter } from './thread.routes'
import { CommunityRouter } from './community.routes'
import { SubCommunityRouter } from './sub_community.routes'
import { MasterStatusRouter } from './master_status.routes'
import { MasterStatusTypeRouter } from './master_status_type.routes'
import { UserInfoRouter } from './user_info.routes'
import { LoggingRouter } from './logging.routes'

const router = Router()

router.use(LoggingRouter)

router.use(MasterStatusRouter)

router.use(MasterStatusTypeRouter)

router.use(CommunityRouter)

router.use(SubCommunityRouter)

router.use(BannerRouter)

router.use(ThreadRouter)

router.use(UserInfoRouter)

export const AppRouter = router
