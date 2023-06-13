import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class VideoComments extends Model<
  InferAttributes<VideoComments>,
  InferCreationAttributes<VideoComments>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare video_id: number

  declare comment: string

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  VideoComments.init(
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
      comment: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'video_comments',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  // Users.hasMany(VideoComments, {
  //   foreignKey: 'user_id',
  //   as: 'video_comments',
  // })

  // Videos.hasMany(VideoComments, {
  //   foreignKey: 'video_id',
  //   as: 'video_comments',
  // })

  // VideoComments.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'commented_by',
  // })

  // VideoComments.belongsTo(Videos, {
  //   foreignKey: 'video_id',
  //   as: 'video',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
