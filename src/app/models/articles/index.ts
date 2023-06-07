import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { Users } from '../users'

export class Articles extends Model<InferAttributes<Articles>, InferCreationAttributes<Articles>> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare title: string

  declare hero_image: string

  declare content: string

  declare views: CreationOptional<number>

  declare is_approved: boolean

  declare is_allow_comment: boolean

  declare start_date: Date

  declare end_date: Date

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  Articles.init(
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
      hero_image: DataTypes.STRING,
      content: DataTypes.STRING,
      views: DataTypes.INTEGER,
      is_approved: DataTypes.BOOLEAN,
      is_allow_comment: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'articles',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  Users.hasMany(Articles, {
    foreignKey: 'user_id',
    as: 'articles',
  })

  Articles.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'created_by',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
