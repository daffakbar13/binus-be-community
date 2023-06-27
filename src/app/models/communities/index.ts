import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { SubCommunities } from '../sub_communities'
import { Banners } from '../banners'
import { Threads } from '../threads'

export class Communities extends Model<
  InferAttributes<Communities>,
  InferCreationAttributes<Communities>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare tenant_id: number

  declare name: string

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>

  declare sub_communities: NonAttribute<SubCommunities[]>

  declare banners: NonAttribute<Banners[]>

  declare threads: NonAttribute<Threads[]>
}

try {
  Communities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      tenant_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'communities',
      sequelize: dbBinusCommunity,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
