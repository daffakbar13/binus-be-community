import { CommunityService } from 'app/services/community.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace CommunityController {
  export async function GetListCommunity(req: Request, res: Response) {
    const result = await CommunityService.GetListCommunity(req)
    return sendResponse(res, result)
  }

  export async function GetDetailCommunity(req: Request, res: Response) {
    const result = await CommunityService.GetDetailCommunity(req)
    return sendResponse(res, result)
  }

  export async function CreateCommunity(req: Request, res: Response) {
    const result = await CommunityService.CreateCommunity(req)
    return sendResponse(res, result)
  }

  export async function Update(req: Request, res: Response) {
    const result = await CommunityService.UpdateCommunity(req)
    return sendResponse(res, result)
  }

  export async function Delete(req: Request, res: Response) {
    const result = await CommunityService.DeleteCommunity(req)
    return sendResponse(res, result)
  }
}
