import { MasterStatusTypeService } from 'app/services/master_status_type.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace MasterStatusTypeController {
  export async function GetListMasterStatusType(req: Request, res: Response) {
    const result = await MasterStatusTypeService.GetListMasterStatusType(req)
    return sendResponse(req, res, result)
  }

  export async function GetMasterStatusTypeDetail(req: Request, res: Response) {
    const result = await MasterStatusTypeService.GetMasterStatusTypeDetail(req)
    return sendResponse(req, res, result)
  }
}
