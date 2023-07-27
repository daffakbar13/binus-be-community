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

export class CommunityMembers extends Model<
  InferAttributes<CommunityMembers>,
  InferCreationAttributes<CommunityMembers>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare community_id: number

  declare is_approved: CreationOptional<boolean>

  declare community: NonAttribute<Communities>
}

try {
  CommunityMembers.init(
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
      is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'community_members',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  Communities.hasMany(CommunityMembers, {
    foreignKey: 'community_id',
    as: 'members',
  })

  CommunityMembers.belongsTo(Communities, {
    foreignKey: 'community_id',
    as: 'community',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
