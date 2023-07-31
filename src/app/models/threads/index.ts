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
import { SubCommunities } from '../sub_communities'
import { ThreadLikes } from '../thread_likes'
import { ThreadComments } from '../thread_comments'
import { ThreadTenants } from '../thread_tenants'
import { MasterStatus } from '../master_status'

export class Threads extends Model<InferAttributes<Threads>, InferCreationAttributes<Threads>> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare community_id: number

  declare sub_community_id: number

  declare status_id: number

  declare title: string

  declare content: string

  declare tags: string

  declare views: CreationOptional<number>

  declare is_allow_comment: boolean

  declare is_pinned: boolean

  declare is_active: boolean

  declare created_at: NonAttribute<Date>

  declare updated_at: NonAttribute<Date>

  declare deleted_at: NonAttribute<Date>

  declare likes: NonAttribute<ThreadLikes[]>

  declare comments: NonAttribute<ThreadComments[]>

  declare community: NonAttribute<Communities>

  declare sub_community: NonAttribute<SubCommunities>

  declare status: NonAttribute<MasterStatus>

  declare tenant_uuid: string
}

try {
  Threads.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      tenant_uuid: DataTypes.TEXT,
      community_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Communities,
          key: 'id',
        },
      },
      sub_community_id: {
        type: DataTypes.INTEGER,
        references: {
          model: SubCommunities,
          key: 'id',
        },
      },
      status_id: {
        type: DataTypes.INTEGER,
        references: {
          model: MasterStatus,
          key: 'id',
        },
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      tags: DataTypes.STRING,
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_allow_comment: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_pinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'threads',
      sequelize: dbBinusCommunity,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  )

  Communities.hasMany(Threads, {
    foreignKey: 'community_id',
    as: 'threads',
  })

  Threads.belongsTo(Communities, {
    foreignKey: 'community_id',
    as: 'community',
  })

  SubCommunities.hasMany(Threads, {
    foreignKey: 'sub_community_id',
    as: 'threads',
  })

  Threads.belongsTo(SubCommunities, {
    foreignKey: 'sub_community_id',
    as: 'sub_community',
  })

  MasterStatus.hasMany(Threads, {
    foreignKey: 'status_id',
    as: 'threads',
  })

  Threads.belongsTo(MasterStatus, {
    foreignKey: 'status_id',
    as: 'status',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
