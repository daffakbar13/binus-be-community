import { dbSokrates } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'
import { Users } from '../users'

export class CommunityCategories extends Model<
  InferAttributes<CommunityCategories>,
  InferCreationAttributes<CommunityCategories>
> {
  declare id: CreationOptional<number>

  declare user_id: number

  declare name: string

  declare created_at: CreationOptional<Date>

  declare updated_at: CreationOptional<Date>
}

try {
  CommunityCategories.init(
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
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'community_categories',
      sequelize: dbSokrates,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )

  Users.hasMany(CommunityCategories, {
    foreignKey: 'user_id',
    as: 'community_categories',
  })

  CommunityCategories.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'created_by',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
