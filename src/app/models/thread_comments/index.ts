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
}

try {
  ThreadComments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status_id: {
        type: DataTypes.INTEGER,
        references: {
          model: MasterStatus,
          key: 'id',
        },
      },
      user_id: DataTypes.INTEGER,
      thread_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Threads,
          key: 'id',
        },
      },
      comment: DataTypes.STRING,
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

  Threads.belongsTo(MasterStatus, {
    foreignKey: 'status_id',
    as: 'status',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
