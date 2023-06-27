import { getEnv } from 'configs/env'
import { Dialect, Sequelize } from 'sequelize'

export const dbBinusCommunity = new Sequelize(
  getEnv('DB_NAME_BINUS_COMMUNITY'),
  getEnv('DB_USERNAME'),
  getEnv('DB_PASSWORD'),
  {
    host: getEnv('DB_HOST'),
    port: Number(getEnv('DB_PORT')),
    dialect: getEnv('DB_DIALECT') as Dialect,
  },
)
