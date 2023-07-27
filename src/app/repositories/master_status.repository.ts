import { MasterStatus } from 'app/models/master_status'
import { WhereOptions } from 'sequelize'

export namespace MasterStatusRepository {
  export function GetListMasterStatus(where?: WhereOptions<MasterStatus>) {
    return MasterStatus.findAll({ where })
  }

  export function GetMasterStatusDetail(where: WhereOptions<MasterStatus>) {
    return MasterStatus.findOne({ where })
  }
}
