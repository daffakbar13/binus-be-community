import { Router } from 'express'
import { AuthRouter } from './auth.routes'
import { UserRouter } from './user.routes'

const router = Router()

router.use(AuthRouter)

router.use(UserRouter)

router.get('/check-ip', async (req, res) => {
  const {
    ip,
    socket: { localAddress, remoteAddress },
  } = req
  // console.log(req.headers)

  // if (!req.signedCookies.last_token) {
  //   res.cookie('last_token', req.sessionID, { maxAge: 1000 * 60, signed: true })
  // }

  // console.log((req.session as any).last_token)

  // if (!(req.session as any).last_token) {
  //   ;(req.session as any).last_token = req.sessionID
  // }
  const publicIp = await import('public-ip')
  const public_ip = await publicIp.publicIpv4()

  // console.log(await publicIp.publicIp())

  // if (!cache.has('last_token')) {
  //   cache.set('last_token', req.sessionID)
  // }

  res.status(200).send({ ip, localAddress, remoteAddress, public_ip })
})

export const AppRouter = Router().use('/v1', router)
