import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
// import proxy from 'express-http-proxy'
import session from 'express-session'
import { getEnv } from 'configs/env'
import cookieParser from 'cookie-parser'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { sendResponse } from 'common/dto/sendResponse.dto'
import * as swaggerDocument from '../docs/swagger.json'
import { AppRouter } from './routes/routes'
import './models'

dotenv.config()

const app = express()
const sessionMaxAge = 1000 * 60 * 60 * 24 * 14 // 14 days

app.use(
  session({
    secret: getEnv('SESSION_SECRET_KEY'),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: sessionMaxAge },
  }),
)

app.use(cookieParser(getEnv('SESSION_SECRET_KEY')))

app.set('trust proxy', true)

app.use(express.json())

app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(AppRouter)

app.use('*', (_, res) => {
  sendResponse(res, baseResponse('NotFound'))
})

export default app
