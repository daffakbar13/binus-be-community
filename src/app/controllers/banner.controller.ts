import { BannerService } from 'app/services/banner.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace BannerController {
  export async function GetListBanner(_: Request, res: Response) {
    const result = await BannerService.GetListBanner()
    return sendResponse(res, result)
  }

  export async function GetDetailBanner(req: Request, res: Response) {
    const result = await BannerService.GetDetailBanner(req)
    return sendResponse(res, result)
  }

  export async function CreateBanner(req: Request, res: Response) {
    const result = await BannerService.CreateBanner(req)
    return sendResponse(res, result)
  }

  export async function Update(req: Request, res: Response) {
    const result = await BannerService.UpdateBanner(req)
    return sendResponse(res, result)
  }

  export async function Delete(req: Request, res: Response) {
    const result = await BannerService.DeleteBanner(req)
    return sendResponse(res, result)
  }
}
