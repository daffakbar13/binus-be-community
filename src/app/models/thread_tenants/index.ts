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

export class ThreadTenants extends Model<
  InferAttributes<ThreadTenants>,
  InferCreationAttributes<ThreadTenants>
> {
  declare id: CreationOptional<number>

  declare thread_id: number

  declare tenant_id: number

  declare thread: NonAttribute<Threads>
}

try {
  ThreadTenants.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      thread_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Threads,
          key: 'id',
        },
      },
      tenant_id: DataTypes.INTEGER,
    },
    {
      tableName: 'thread_tenants',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  Threads.hasMany(ThreadTenants, {
    foreignKey: 'thread_id',
    as: 'tenants',
  })

  ThreadTenants.belongsTo(ThreadTenants, {
    foreignKey: 'thread_id',
    as: 'thread',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
