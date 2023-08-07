import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { MasterRole } from '../master_role'

export class ThreadsSetting extends Model<
  InferAttributes<ThreadsSetting>,
  InferCreationAttributes<ThreadsSetting>
> {
  declare id: CreationOptional<number>

  declare role_id: number

  declare need_approval: boolean

  declare tenant_uuid: string

  declare role: NonAttribute<MasterRole>
}

try {
  ThreadsSetting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: MasterRole,
          key: 'id',
        },
      },
      need_approval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      tenant_uuid: DataTypes.STRING,
    },
    {
      tableName: 'thread_setting',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  MasterRole.hasMany(ThreadsSetting, {
    foreignKey: 'role_id',
    as: 'setting',
  })

  ThreadsSetting.belongsTo(MasterRole, {
    foreignKey: 'role_id',
    as: 'role',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
