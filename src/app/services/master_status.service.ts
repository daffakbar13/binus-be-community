import { MasterStatusRepository } from 'app/repositories/master_status.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'

export namespace MasterStatusService {
  export async function GetListMasterStatus(req: Request) {
    try {
      const { type } = req.params
      const result = await MasterStatusRepository.GetListMasterStatus({
        ...(type && { type_id: type }),
      })
      return baseResponse('Ok', { results: result })
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailMasterStatus(req: Request) {
    try {
      const result = await MasterStatusRepository.GetDetailMasterStatus({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
