import { MasterStatusRepository } from 'app/repositories/master_status.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Constant } from 'common/constants'
import { LoggingService } from './logging.service'

export namespace MasterStatusService {
  export async function GetListMasterStatus(req: Request) {
    try {
      const { type } = req.params
      const result = await MasterStatusRepository.GetListMasterStatus({
        ...(type && { type_id: type }),
      })
      return baseResponse('Ok', { results: result })
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMasterStatusDetail(req: Request) {
    try {
      const result = await MasterStatusRepository.GetMasterStatusDetail({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }
}
