import { Router } from 'express'
import { AuthRouter } from './auth.routes'
import { UserRouter } from './user.routes'

const router = Router()

router.use(AuthRouter)

router.use(UserRouter)

router.get('/check-ip', (req, res) => {
  const {
    ip,
    socket: { localAddress, remoteAddress },
  } = req
  res.status(200).send({ ip, localAddress, remoteAddress })
})

export const AppRouter = Router().use('/v1', router)
