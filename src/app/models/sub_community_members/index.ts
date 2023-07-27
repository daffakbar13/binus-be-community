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

export class SubCommunityMembers extends Model<
  InferAttributes<SubCommunityMembers>,
  InferCreationAttributes<SubCommunityMembers>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare sub_community_id: number

  declare is_approved: CreationOptional<boolean>

  declare sub_community: NonAttribute<SubCommunities>
}

try {
  SubCommunityMembers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      sub_community_id: {
        type: DataTypes.INTEGER,
        references: {
          model: SubCommunities,
          key: 'id',
        },
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'sub_community_members',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  SubCommunities.hasMany(SubCommunityMembers, {
    foreignKey: 'sub_community_id',
    as: 'members',
  })

  SubCommunityMembers.belongsTo(SubCommunities, {
    foreignKey: 'sub_community_id',
    as: 'sub_community',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
