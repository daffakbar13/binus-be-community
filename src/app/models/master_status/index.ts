import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { Threads } from '../threads'
import { MasterStatusType } from '../master_status_type'

export class MasterStatus extends Model<
  InferAttributes<MasterStatus>,
  InferCreationAttributes<MasterStatus>
> {
  declare id: CreationOptional<number>

  declare type_id: string

  declare status: string

  declare threads: NonAttribute<Threads>
}

try {
  MasterStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type_id: {
        type: DataTypes.CHAR(1),
        references: {
          model: MasterStatusType,
          key: 'id',
        },
      },
      status: DataTypes.STRING,
    },
    {
      tableName: 'master_statuses',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  MasterStatusType.hasMany(MasterStatus, {
    foreignKey: 'type_id',
    as: 'statuses',
  })

  MasterStatus.belongsTo(MasterStatusType, {
    foreignKey: 'type_id',
    as: 'type',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
