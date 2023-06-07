import express from 'express'
import morgan from 'morgan'
import { AppRouter } from './routes/routes'

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use(AppRouter)

export default app
