import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class ArticleCommentLikes extends Model<
  InferAttributes<ArticleCommentLikes>,
  InferCreationAttributes<ArticleCommentLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare article_comment_id: number

  // declare liked_by: NonAttribute<Users>

  // declare article_comment: NonAttribute<ArticleComments>
}

try {
  ArticleCommentLikes.init(
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
      article_comment_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: ArticleComments,
        //   key: 'id',
        // },
      },
    },
    {
      tableName: 'article_comment_likes',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )

  // Users.hasMany(ArticleCommentLikes, {
  //   foreignKey: 'user_id',
  //   as: 'article_comment_likes',
  // })

  // ArticleComments.hasMany(ArticleCommentLikes, {
  //   foreignKey: 'article_comment_id',
  //   as: 'article_comment_likes',
  // })

  // ArticleCommentLikes.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'liked_by',
  // })

  // ArticleCommentLikes.belongsTo(ArticleComments, {
  //   foreignKey: 'article_comment_id',
  //   as: 'article_comment',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
