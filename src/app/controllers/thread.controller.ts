import { ThreadService } from 'app/services/thread.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace ThreadController {
  export async function GetListThread(_: Request, res: Response) {
    const result = await ThreadService.GetListThread()
    return sendResponse(res, result)
  }

  export async function GetDetailThread(req: Request, res: Response) {
    const result = await ThreadService.GetDetailThread(req)
    return sendResponse(res, result)
  }

  export async function CreateThread(req: Request, res: Response) {
    const result = await ThreadService.CreateThread(req)
    return sendResponse(res, result)
  }

  export async function Update(req: Request, res: Response) {
    const result = await ThreadService.UpdateThread(req)
    return sendResponse(res, result)
  }

  export async function Delete(req: Request, res: Response) {
    const result = await ThreadService.DeleteThread(req)
    return sendResponse(res, result)
  }
}
