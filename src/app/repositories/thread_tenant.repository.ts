import { ThreadTenants } from 'app/models/thread_tenants'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadTenantRepository {
  export function GetListThreadTenant() {
    return ThreadTenants.findAll()
  }

  export function GetDetailThreadTenant(where: WhereOptions<ThreadTenants>) {
    return ThreadTenants.findOne({ where })
  }

  export function CreateThreadTenant(payload: CreationAttributes<ThreadTenants>[]) {
    return ThreadTenants.bulkCreate(payload)
  }

  export function UpdateThreadTenant(
    id: number,
    payload: { [key in keyof Attributes<ThreadTenants>]?: Attributes<ThreadTenants>[key] },
  ) {
    return ThreadTenants.update(payload, { where: { id } })
  }

  export function DeleteThreadTenant(where: WhereOptions<ThreadTenants>) {
    return ThreadTenants.destroy({ where })
  }
}
