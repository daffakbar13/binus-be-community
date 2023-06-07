import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { Users } from '../users'
import { Threads } from '../threads'

export class ThreadComments extends Model<
  InferAttributes<ThreadComments>,
  InferCreationAttributes<ThreadComments>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare thread_id: number

  declare comment: string

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  ThreadComments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: 'id',
        },
      },
      thread_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Threads,
          key: 'id',
        },
      },
      comment: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'thread_comments',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  Users.hasMany(ThreadComments, {
    foreignKey: 'user_id',
    as: 'thread_comments',
  })

  Threads.hasMany(ThreadComments, {
    foreignKey: 'thread_id',
    as: 'thread_comments',
  })

  ThreadComments.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'commented_by',
  })

  ThreadComments.belongsTo(Threads, {
    foreignKey: 'thread_id',
    as: 'thread',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
