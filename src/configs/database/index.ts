import { Dialect, Sequelize } from 'sequelize'

const sokratesConfig = {
  dbName: 'binusdb',
  username: 'binus',
  password: 'aksds5shw21ld09n',
  host: '192.168.0.25',
  dialect: 'postgres' as Dialect,
}

export const dbSokrates = new Sequelize(
  sokratesConfig.dbName,
  sokratesConfig.username,
  sokratesConfig.password,
  {
    host: sokratesConfig.host,
    dialect: sokratesConfig.dialect,
  },
)
