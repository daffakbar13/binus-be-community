import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class ThreadLikes extends Model<
  InferAttributes<ThreadLikes>,
  InferCreationAttributes<ThreadLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare thread_id: number
}

try {
  ThreadLikes.init(
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
      thread_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: Threads,
        //   key: 'id',
        // },
      },
    },
    {
      tableName: 'thread_likes',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )

  // Users.hasMany(ThreadLikes, {
  //   foreignKey: 'user_id',
  //   as: 'thread_likes',
  // })

  // Threads.hasMany(ThreadLikes, {
  //   foreignKey: 'thread_id',
  //   as: 'thread_likes',
  // })

  // ThreadLikes.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'liked_byk',
  // })

  // ThreadLikes.belongsTo(Threads, {
  //   foreignKey: 'thread_id',
  //   as: 'thread',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
