import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { Users } from '../users'

export class UserEmails extends Model<
  InferAttributes<UserEmails>,
  InferCreationAttributes<UserEmails>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare email: string
}

try {
  UserEmails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: 'id',
        },
      },
      email: DataTypes.STRING,
    },
    {
      tableName: 'user_emails',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )

  Users.hasMany(UserEmails, {
    foreignKey: 'user_id',
    as: 'emails',
  })

  UserEmails.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'user',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
