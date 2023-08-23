import { SubCommunityService } from 'app/services/sub_community.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace SubCommunityController {
  export async function GetListSubCommunity(req: Request, res: Response) {
    const result = await SubCommunityService.GetListSubCommunity(req)
    return sendResponse(req, res, result)
  }

  export async function GetDetailSubCommunity(req: Request, res: Response) {
    const result = await SubCommunityService.GetDetailSubCommunity(req)
    return sendResponse(req, res, result)
  }

  export async function CreateSubCommunity(req: Request, res: Response) {
    const result = await SubCommunityService.CreateSubCommunity(req)
    return sendResponse(req, res, result)
  }

  export async function Update(req: Request, res: Response) {
    const result = await SubCommunityService.UpdateSubCommunity(req)
    return sendResponse(req, res, result)
  }

  export async function Delete(req: Request, res: Response) {
    const result = await SubCommunityService.DeleteSubCommunity(req)
    return sendResponse(req, res, result)
  }
}
