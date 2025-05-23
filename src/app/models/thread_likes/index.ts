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

export class ThreadLikes extends Model<
  InferAttributes<ThreadLikes>,
  InferCreationAttributes<ThreadLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare thread_id: number

  declare thread: NonAttribute<Threads>
}

try {
  ThreadLikes.init(
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
    },
    {
      tableName: 'thread_likes',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  Threads.hasMany(ThreadLikes, {
    foreignKey: 'thread_id',
    as: 'likes',
  })

  ThreadLikes.belongsTo(Threads, {
    foreignKey: 'thread_id',
    as: 'thread',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
