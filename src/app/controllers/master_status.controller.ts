import { MasterStatusService } from 'app/services/master_status.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace MasterStatusController {
  export async function GetListMasterStatus(req: Request, res: Response) {
    const result = await MasterStatusService.GetListMasterStatus(req)
    return sendResponse(res, result)
  }

  export async function GetDetailMasterStatus(req: Request, res: Response) {
    const result = await MasterStatusService.GetDetailMasterStatus(req)
    return sendResponse(res, result)
  }
}
