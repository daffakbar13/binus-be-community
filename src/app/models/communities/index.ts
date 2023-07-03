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

  declare created_at: NonAttribute<Date>

  declare updated_at: NonAttribute<Date>

  declare deleted_at: NonAttribute<Date>

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
    },
    {
      tableName: 'communities',
      sequelize: dbBinusCommunity,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  )
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
