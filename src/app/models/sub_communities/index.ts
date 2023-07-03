import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { Communities } from '../communities'

export class SubCommunities extends Model<
  InferAttributes<SubCommunities>,
  InferCreationAttributes<SubCommunities>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare community_id: number

  declare name: string

  declare created_at: NonAttribute<Date>

  declare updated_at: NonAttribute<Date>

  declare deleted_at: NonAttribute<Date>

  declare community: NonAttribute<Communities>
}

try {
  SubCommunities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      community_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Communities,
          key: 'id',
        },
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'sub_communities',
      sequelize: dbBinusCommunity,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  )

  Communities.hasMany(SubCommunities, {
    foreignKey: 'community_id',
    as: 'sub_communities',
  })

  SubCommunities.belongsTo(Communities, {
    foreignKey: 'community_id',
    as: 'community',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
