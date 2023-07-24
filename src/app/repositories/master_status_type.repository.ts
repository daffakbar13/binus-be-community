import { MasterStatusType } from 'app/models/master_status_type'
import { WhereOptions } from 'sequelize'

export namespace MasterStatusTypeRepository {
  export function GetListMasterStatusType() {
    return MasterStatusType.findAll()
  }

  export function GetDetailMasterStatusType(where: WhereOptions<MasterStatusType>) {
    return MasterStatusType.findOne({ where })
  }
}
