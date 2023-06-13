import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

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
        // references: {
        //   model: Users,
        //   key: 'id',
        // },
      },
      community_category_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: CommunityCategories,
        //   key: 'id',
        // },
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

  // Users.hasMany(SubCommunityCategories, {
  //   foreignKey: 'user_id',
  //   as: 'sub_community_categories',
  // })

  // CommunityCategories.hasMany(SubCommunityCategories, {
  //   foreignKey: 'community_category_id',
  //   as: 'sub_community_categories',
  // })

  // SubCommunityCategories.belongsTo(CommunityCategories, {
  //   foreignKey: 'community_category_id',
  //   as: 'community_category',
  // })

  // SubCommunityCategories.belongsTo(Users, {
  //   foreignKey: 'user_id',
  //   as: 'created_by',
  // })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
