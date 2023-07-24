import { MasterStatusTypeService } from 'app/services/master_status_type.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace MasterStatusTypeController {
  export async function GetListMasterStatusType(_: Request, res: Response) {
    const result = await MasterStatusTypeService.GetListMasterStatusType()
    return sendResponse(res, result)
  }

  export async function GetDetailMasterStatusType(req: Request, res: Response) {
    const result = await MasterStatusTypeService.GetDetailMasterStatusType(req)
    return sendResponse(res, result)
  }
}
