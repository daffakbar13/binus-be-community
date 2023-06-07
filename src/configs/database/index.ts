import { Sequelize } from 'sequelize'

export const dbSokrates = new Sequelize('db_sokrates', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
})
