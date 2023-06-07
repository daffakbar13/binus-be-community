import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { UserRoles } from '../user_roles'

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<number>

  declare user_role_id: number

  declare binusian_id: number

  declare name: string

  declare profile_picture: string

  declare nik: string

  declare birth_date: string

  declare address: string

  declare password: string

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: UserRoles,
          key: 'id',
        },
      },
      binusian_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      nik: DataTypes.STRING,
      birth_date: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'users',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  UserRoles.hasMany(Users, {
    foreignKey: 'user_role_id',
    as: 'users',
  })

  Users.belongsTo(UserRoles, {
    foreignKey: 'user_role_id',
    as: 'role',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
