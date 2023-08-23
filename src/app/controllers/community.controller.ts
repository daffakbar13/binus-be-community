import { CommunityService } from 'app/services/community.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace CommunityController {
  export async function GetCommunityList(req: Request, res: Response) {
    const result = await CommunityService.GetCommunityList(req)
    return sendResponse(req, res, result)
  }

  export async function GetCommunityDetail(req: Request, res: Response) {
    const result = await CommunityService.GetCommunityDetail(req)
    return sendResponse(req, res, result)
  }

  export async function CreateCommunity(req: Request, res: Response) {
    const result = await CommunityService.CreateCommunity(req)
    return sendResponse(req, res, result)
  }

  export async function UpdateCommunity(req: Request, res: Response) {
    const result = await CommunityService.UpdateCommunity(req)
    return sendResponse(req, res, result)
  }

  export async function DeleteCommunity(req: Request, res: Response) {
    const result = await CommunityService.DeleteCommunity(req)
    return sendResponse(req, res, result)
  }
}
