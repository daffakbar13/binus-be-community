import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class VideoLikes extends Model<
  InferAttributes<VideoLikes>,
  InferCreationAttributes<VideoLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare video_id: number
}

try {
  VideoLikes.init(
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
      video_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: Videos,
        //   key: 'id',
        // },
      },
    },
    {
      tableName: 'video_likes',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )

  // Users.hasMany(VideoLikes, {
  //   foreignKey: 'user_id',
  //   as: 'video_likes',
  // })

  // Videos.hasMany(VideoLikes, {
  //   foreignKey: 'video_id',
  //   as: 'video_likes',
  // })

  // VideoLikes.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'liked_by',
  // })

  // VideoLikes.belongsTo(Videos, {
  //   foreignKey: 'video_id',
  //   as: 'video',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
