import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { Users } from '../users'

export class Videos extends Model<InferAttributes<Videos>, InferCreationAttributes<Videos>> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare title: string

  declare video_url: string

  declare views: CreationOptional<number>

  declare is_approved: boolean

  declare is_allow_comment: boolean

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  Videos.init(
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
      title: DataTypes.STRING,
      video_url: DataTypes.STRING,
      views: DataTypes.INTEGER,
      is_approved: DataTypes.BOOLEAN,
      is_allow_comment: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'videos',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  Users.hasMany(Videos, {
    foreignKey: 'user_id',
    as: 'videos',
  })

  Videos.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'created_by',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
