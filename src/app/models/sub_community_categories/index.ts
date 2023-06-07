import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { CommunityCategories } from '../community_categories'
import { Users } from '../users'

export class SubCommunityCategories extends Model<
  InferAttributes<SubCommunityCategories>,
  InferCreationAttributes<SubCommunityCategories>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare community_category_id: number

  declare name: string

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  SubCommunityCategories.init(
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
      community_category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: CommunityCategories,
          key: 'id',
        },
      },
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'sub_community_categories',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
  /**
   * users has many sub_community_categories
   * as sub_community_categories
   * foreign key user_id
   */
  Users.hasMany(SubCommunityCategories, {
    foreignKey: 'user_id',
    as: 'sub_community_categories',
  })
  /**
   * community_categories has many sub_community_categories
   * as sub_community_categories
   * foreign key community_category_id
   */
  CommunityCategories.hasMany(SubCommunityCategories, {
    foreignKey: 'community_category_id',
    as: 'sub_community_categories',
  })
  /**
   * sub_community_categories belongs to community_categories
   * as community_category
   * foreign key community_category_id
   */
  SubCommunityCategories.belongsTo(CommunityCategories, {
    foreignKey: 'community_category_id',
    as: 'community_category',
  })
  /**
   * sub_community_categories belongs to users
   * as created_by
   * foreign key user_id
   */
  SubCommunityCategories.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'created_by',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
