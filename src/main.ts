import dotenv from 'dotenv'
import http from 'http'
import { HealthCheckError, createTerminus } from '@godaddy/terminus'
import app from 'app'
import { getEnv } from 'configs/env'
import { dbBinusCommunity } from 'configs/database'

dotenv.config()

const server = http.createServer(app)

createTerminus(server, {
  healthChecks: {
    '/health': async () => {
      const errors: Array<any> = []
      return Promise.all(
        [dbBinusCommunity.authenticate()].map((c) =>
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
dbBinusCommunity.sync().catch(console.error)

server.listen(getEnv('API_PORT'), () => {
  // eslint-disable-next-line no-console
  dbBinusCommunity.authenticate().catch(console.error)
  // eslint-disable-next-line no-console
  console.info(`Sokrates listening at ${getEnv('API_HOST')}:${getEnv('API_PORT')}`)
})
