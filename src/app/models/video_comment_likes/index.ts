import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class VideoCommentLikes extends Model<
  InferAttributes<VideoCommentLikes>,
  InferCreationAttributes<VideoCommentLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare video_comment_id: number
}

try {
  VideoCommentLikes.init(
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
      video_comment_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: VideoComments,
        //   key: 'id',
        // },
      },
    },
    {
      tableName: 'video_comment_likes',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )

  // Users.hasMany(VideoCommentLikes, {
  //   foreignKey: 'user_id',
  //   as: 'video_comment_likes',
  // })

  // VideoComments.hasMany(VideoCommentLikes, {
  //   foreignKey: 'video_comment_id',
  //   as: 'video_comment_likes',
  // })

  // VideoCommentLikes.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'liked_by',
  // })

  // VideoCommentLikes.belongsTo(VideoComments, {
  //   foreignKey: 'video_comment_id',
  //   as: 'video_comment',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
