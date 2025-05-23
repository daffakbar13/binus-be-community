import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { Threads } from '../threads'
import { ThreadLikes } from '../thread_likes'
import { MasterStatus } from '../master_status'
import { ThreadTenants } from '../thread_tenants'

export class ThreadComments extends Model<
  InferAttributes<ThreadComments>,
  InferCreationAttributes<ThreadComments>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare thread_id: number

  declare comment: string

  declare created_at: NonAttribute<Date>

  declare updated_at: NonAttribute<Date>

  declare thread: NonAttribute<Threads>

  declare likes: NonAttribute<ThreadLikes[]>

  declare status: NonAttribute<MasterStatus>

  declare status_id: number

  declare tenant_uuid: string

  declare tenants: NonAttribute<ThreadTenants[]>
}

try {
  ThreadComments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      thread_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Threads,
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
      comment: DataTypes.STRING,
      tenant_uuid: DataTypes.TEXT,
    },
    {
      tableName: 'thread_comments',
      sequelize: dbBinusCommunity,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  Threads.hasMany(ThreadComments, {
    foreignKey: 'thread_id',
    as: 'comments',
  })

  ThreadComments.belongsTo(Threads, {
    foreignKey: 'thread_id',
    as: 'thread',
  })

  MasterStatus.hasMany(ThreadComments, {
    foreignKey: 'status_id',
    as: 'thread_comments',
  })

  ThreadComments.belongsTo(MasterStatus, {
    foreignKey: 'status_id',
    as: 'status',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
