import { MasterStatusTypeRepository } from 'app/repositories/master_status_type.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'

export namespace MasterStatusTypeService {
  export async function GetListMasterStatusType() {
    try {
      const result = await MasterStatusTypeRepository.GetListMasterStatusType()
      return baseResponse('Ok', { results: result })
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMasterStatusTypeDetail(req: Request) {
    try {
      const result = await MasterStatusTypeRepository.GetMasterStatusTypeDetail({
        id: req.params.id,
      })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
