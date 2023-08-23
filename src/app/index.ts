import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import session from 'express-session'
import { getEnv } from 'configs/env'
import cookieParser from 'cookie-parser'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { sendResponse } from 'common/dto/sendResponse.dto'
import bodyParser from 'body-parser'
import * as swaggerDocument from '../docs/swagger.json'
import { AppRouter } from './routes/routes'
import './models'

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

app.use(bodyParser.json({ limit: '10mb' }))

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(AppRouter)

app.use('*', (req, res) => {
  sendResponse(req, res, baseResponse('NotFound'))
})

export default app
