import { dbBinusCommunity } from 'configs/database'
import { Model, InferAttributes, InferCreationAttributes, DataTypes, NonAttribute } from 'sequelize'
import { MasterStatus } from '../master_status'

export class MasterStatusType extends Model<
  InferAttributes<MasterStatusType>,
  InferCreationAttributes<MasterStatusType>
> {
  declare id: string

  declare type: string

  declare statuses: NonAttribute<MasterStatus[]>
}

try {
  MasterStatusType.init(
    {
      id: {
        type: DataTypes.CHAR(1),
        primaryKey: true,
      },
      type: DataTypes.STRING,
    },
    {
      tableName: 'master_status_types',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
