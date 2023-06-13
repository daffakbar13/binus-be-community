import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class Banners extends Model<InferAttributes<Banners>, InferCreationAttributes<Banners>> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare title: string

  declare description: string

  declare image_url: string

  declare external_url: string

  declare is_active: boolean

  declare start_date: Date

  declare end_date: Date

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  Banners.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: Users,
        //   key: 'id',
        // },
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image_url: DataTypes.STRING,
      external_url: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'banners',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  // Users.hasMany(Banners, {
  //   foreignKey: 'user_id',
  //   as: 'banners',
  // })

  // Banners.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'created_by',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
