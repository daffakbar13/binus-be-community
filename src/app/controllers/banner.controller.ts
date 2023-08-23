import { BannerService } from 'app/services/banner.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace BannerController {
  export async function GetBannerList(req: Request, res: Response) {
    const result = await BannerService.GetBannerList(req)
    return sendResponse(req, res, result)
  }

  export async function GetBannerDetail(req: Request, res: Response) {
    const result = await BannerService.GetBannerDetail(req)
    return sendResponse(req, res, result)
  }

  export async function CreateBanner(req: Request, res: Response) {
    const result = await BannerService.CreateBanner(req)
    return sendResponse(req, res, result)
  }

  export async function UpdateBanner(req: Request, res: Response) {
    const result = await BannerService.UpdateBanner(req)
    return sendResponse(req, res, result)
  }

  export async function DeleteBanner(req: Request, res: Response) {
    const result = await BannerService.DeleteBanner(req)
    return sendResponse(req, res, result)
  }
}
