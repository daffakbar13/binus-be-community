import { MasterStatusTypeRepository } from 'app/repositories/master_status_type.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Constant } from 'common/constants'
import { LoggingService } from './logging.service'

export namespace MasterStatusTypeService {
  export async function GetListMasterStatusType(req: Request) {
    try {
      const result = await MasterStatusTypeRepository.GetListMasterStatusType()
      return baseResponse('Ok', { results: result })
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
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
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }
}
