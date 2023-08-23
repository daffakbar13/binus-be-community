import { MasterStatusService } from 'app/services/master_status.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace MasterStatusController {
  export async function GetListMasterStatus(req: Request, res: Response) {
    const result = await MasterStatusService.GetListMasterStatus(req)
    return sendResponse(req, res, result)
  }

  export async function GetMasterStatusDetail(req: Request, res: Response) {
    const result = await MasterStatusService.GetMasterStatusDetail(req)
    return sendResponse(req, res, result)
  }
}
