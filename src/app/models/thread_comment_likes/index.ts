import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { ThreadComments } from '../thread_comments'

export class ThreadCommentLikes extends Model<
  InferAttributes<ThreadCommentLikes>,
  InferCreationAttributes<ThreadCommentLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare thread_comment_id: number

  declare thread_comment: NonAttribute<ThreadComments>
}

try {
  ThreadCommentLikes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      thread_comment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: ThreadComments,
          key: 'id',
        },
      },
    },
    {
      tableName: 'thread_comment_likes',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  ThreadComments.hasMany(ThreadCommentLikes, {
    foreignKey: 'thread_comment_id',
    as: 'likes',
  })

  ThreadCommentLikes.belongsTo(ThreadComments, {
    foreignKey: 'thread_comment_id',
    as: 'comment',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
