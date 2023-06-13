import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

export class ArticleLikes extends Model<
  InferAttributes<ArticleLikes>,
  InferCreationAttributes<ArticleLikes>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare article_id: number

  // declare liked_by: NonAttribute<Users>

  // declare article: NonAttribute<Articles>
}

try {
  ArticleLikes.init(
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
      article_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: Articles,
        //   key: 'id',
        // },
      },
    },
    {
      tableName: 'article_likes',
      sequelize: dbSokrates,
      timestamps: false,
    },
  )

  // Users.hasMany(ArticleLikes, {
  //   foreignKey: 'user_id',
  //   as: 'article_likes',
  // })

  // Articles.hasMany(ArticleLikes, {
  //   foreignKey: 'article_id',
  //   as: 'article_likes',
  // })

  // ArticleLikes.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'liked_by',
  // })

  // ArticleLikes.belongsTo(Articles, {
  //   foreignKey: 'article_id',
  //   as: 'article',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
