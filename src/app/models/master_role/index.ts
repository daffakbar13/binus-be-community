import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { ThreadsSetting } from '../threads_setting'

export class MasterRole extends Model<
  InferAttributes<MasterRole>,
  InferCreationAttributes<MasterRole>
> {
  declare id: CreationOptional<number>

  declare role_name: string

  declare setting: NonAttribute<ThreadsSetting>
}

try {
  MasterRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: DataTypes.STRING,
    },
    {
      tableName: 'master_role',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
