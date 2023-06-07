import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { Users } from '../users'
import { Articles } from '../articles'

export class ArticleComments extends Model<
  InferAttributes<ArticleComments>,
  InferCreationAttributes<ArticleComments>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare article_id: number

  declare comment: string

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  ArticleComments.init(
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
      article_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Articles,
          key: 'id',
        },
      },
      comment: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'article_comments',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  Users.hasMany(ArticleComments, {
    foreignKey: 'user_id',
    as: 'article_comments',
  })

  Articles.hasMany(ArticleComments, {
    foreignKey: 'article_id',
    as: 'article_comments',
  })

  ArticleComments.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'commented_by',
  })

  ArticleComments.belongsTo(Articles, {
    foreignKey: 'article_id',
    as: 'article',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
