import dotenv from 'dotenv'
import http from 'http'
import { HealthCheckError, createTerminus } from '@godaddy/terminus'
import app from 'app'
import { getEnv } from 'configs/env'
import 'app/models'
import { dbSokrates } from 'configs/database'

dotenv.config()

const server = http.createServer(app)

createTerminus(server, {
  healthChecks: {
    '/health': async () => {
      const errors: Array<any> = []
      return Promise.all(
        [dbSokrates.authenticate()].map((c) =>
          c.catch((error) => {
            errors.push(error)
            return undefined
          }),
        ),
      ).then(() => {
        if (errors.length) {
          throw new HealthCheckError('healthcheck failed', errors)
        }
      })
    },
  },
})

// eslint-disable-next-line no-console
dbSokrates.sync().catch(console.error)

server.listen(getEnv('API_PORT'), () => {
  // eslint-disable-next-line no-console
  dbSokrates.authenticate().catch(console.error)
  // eslint-disable-next-line no-console
  console.info(`Sokrates listening at ${getEnv('API_HOST')}:${getEnv('API_PORT')}`)
})

// Satryo : Try push to WGS Repo
// Hans : Try push to WGS Repo