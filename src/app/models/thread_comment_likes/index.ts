import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class ThreadCommentLikes extends Model<
  InferAttributes<ThreadCommentLikes>,
  InferCreationAttributes<ThreadCommentLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare thread_comment_id: number
}

try {
  ThreadCommentLikes.init(
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
      thread_comment_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: ThreadComments,
        //   key: 'id',
        // },
      },
    },
    {
      tableName: 'thread_comment_likes',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )

  // Users.hasMany(ThreadCommentLikes, {
  //   foreignKey: 'user_id',
  //   as: 'thread_comment_likes',
  // })

  // ThreadComments.hasMany(ThreadCommentLikes, {
  //   foreignKey: 'thread_comment_id',
  //   as: 'thread_comment_likes',
  // })

  // ThreadCommentLikes.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'liked_by',
  // })

  // ThreadCommentLikes.belongsTo(ThreadComments, {
  //   foreignKey: 'thread_comment_id',
  //   as: 'thread_comment',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
