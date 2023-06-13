import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class UserRoles extends Model<
  InferAttributes<UserRoles>,
  InferCreationAttributes<UserRoles>
> {
  declare id: CreationOptional<number>

  declare role: string

  // declare users: NonAttribute<Users[]>
}

try {
  UserRoles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: DataTypes.STRING,
    },
    {
      tableName: 'user_roles',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
