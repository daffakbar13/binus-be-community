import { CommunityMemberService } from 'app/services/community_member.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace CommunityMemberController {
  export async function GetAllCommunityMember(req: Request, res: Response) {
    const result = await CommunityMemberService.GetAllCommunityMember(req)
    return sendResponse(res, result)
  }

  export async function GetCommunityMemberList(req: Request, res: Response) {
    const result = await CommunityMemberService.GetCommunityMemberList(req)
    return sendResponse(res, result)
  }

  export async function RequestCommunityMember(req: Request, res: Response) {
    const result = await CommunityMemberService.RequestCommunityMember(req)
    return sendResponse(res, result)
  }

  export async function ApproveCommunityMember(req: Request, res: Response) {
    const result = await CommunityMemberService.ApproveCommunityMember(req)
    return sendResponse(res, result)
  }

  export async function DeleteCommunityMember(req: Request, res: Response) {
    const result = await CommunityMemberService.DeleteCommunityMember(req)
    return sendResponse(res, result)
  }
}
