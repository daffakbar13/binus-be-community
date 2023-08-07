import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'

export class Banners extends Model<InferAttributes<Banners>, InferCreationAttributes<Banners>> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare title: string

  declare description: string

  declare image_url: string

  declare image_key: string

  declare external_url: string

  declare is_active: boolean

  declare start_date: Date

  declare end_date: Date

  declare created_at: NonAttribute<Date>

  declare updated_at: NonAttribute<Date>

  declare deleted_at: NonAttribute<Date>
}

try {
  Banners.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image_url: DataTypes.STRING,
      image_key: DataTypes.STRING,
      external_url: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      tableName: 'banners',
      sequelize: dbBinusCommunity,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
