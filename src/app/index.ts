import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../docs/swagger.json'
import { AppRouter } from './routes/routes'

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(AppRouter)

export default app
