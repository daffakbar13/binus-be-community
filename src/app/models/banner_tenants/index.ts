import { dbBinusCommunity } from 'configs/database'
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from 'sequelize'
import { Banners } from '../banners'

export class BannerTenants extends Model<
  InferAttributes<BannerTenants>,
  InferCreationAttributes<BannerTenants>
> {
  declare id: CreationOptional<number>

  declare banner_id: number

  declare tenant_id: number

  declare banner: NonAttribute<Banners>
}

try {
  BannerTenants.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      banner_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Banners,
          key: 'id',
        },
      },
      tenant_id: DataTypes.INTEGER,
    },
    {
      tableName: 'banner_tenants',
      sequelize: dbBinusCommunity,
      timestamps: false,
    },
  )

  Banners.hasMany(BannerTenants, {
    foreignKey: 'banner_id',
    as: 'tenants',
  })

  BannerTenants.belongsTo(Banners, {
    foreignKey: 'banner_id',
    as: 'banner',
  })
} catch (error) {
  /* eslint-disable no-console */
  console.error(error)
}
