import { ThreadSettingService } from 'app/services/thread_setting.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace ThreadSettingController {
  export async function GetThreadSettingList(req: Request, res: Response) {
    const result = await ThreadSettingService.GetListThreadSetting(req)
    return sendResponse(req, res, result)
  }

  export async function UpdateThreadSetting(req: Request, res: Response) {
    const result = await ThreadSettingService.UpdateThreadSetting(req)
    return sendResponse(req, res, result)
  }
}
