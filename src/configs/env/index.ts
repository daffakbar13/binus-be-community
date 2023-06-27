import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
})

type EnvKeys =
  | 'API_PORT'
  | 'API_HOST'
  | 'API_GATEWAY_HOST'
  | 'DB_HOST'
  | 'DB_PORT'
  | 'DB_DIALECT'
  | 'DB_USERNAME'
  | 'DB_PASSWORD'
  | 'DB_NAME_BINUS_COMMUNITY'
  | 'SESSION_SECRET_KEY'
  | 'BUCKET_NAME'

export function getEnv(key: EnvKeys) {
  return process.env[key] as string
}
