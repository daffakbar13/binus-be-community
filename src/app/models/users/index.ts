import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { UserRoles } from '../user_roles'

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<number>

  declare user_role_id: number

  declare binusian_id: number

  declare name: string

  declare profile_picture: string

  declare nik: string

  declare birth_date: string

  declare address: string

  declare password: string

  declare is_active: CreationOptional<boolean>

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>

  // declare role: NonAttribute<UserRoles>

  // declare emails: NonAttribute<UserEmails[]>

  // declare articles: NonAttribute<Articles[]>

  // declare article_comments: NonAttribute<ArticleComments[]>

  // declare article_likes: NonAttribute<ArticleLikes[]>

  // declare article_comment_likes: NonAttribute<ArticleCommentLikes[]>

  // declare threads: NonAttribute<Threads[]>

  // declare thread_comments: NonAttribute<ThreadComments[]>

  // declare thread_likes: NonAttribute<ThreadLikes[]>

  // declare thread_comment_likes: NonAttribute<ThreadCommentLikes[]>
}

try {
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: UserRoles,
          key: 'id',
        },
      },
      binusian_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      nik: DataTypes.STRING,
      birth_date: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'users',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  UserRoles.hasMany(Users, {
    foreignKey: 'user_role_id',
    as: 'users',
  })

  Users.belongsTo(UserRoles, {
    foreignKey: 'user_role_id',
    as: 'role',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
