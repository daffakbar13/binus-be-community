import { SubCommunityMemberService } from 'app/services/sub_community_member.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace SubCommunityMemberController {
  export async function GetSubCommunityMemberList(req: Request, res: Response) {
    const result = await SubCommunityMemberService.GetSubCommunityMemberList(req)
    return sendResponse(res, result)
  }

  export async function RequestSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.RequestSubCommunityMember(req)
    return sendResponse(res, result)
  }

  export async function ApproveSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.ApproveSubCommunityMember(req)
    return sendResponse(res, result)
  }

  export async function DeleteSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.DeleteSubCommunityMember(req)
    return sendResponse(res, result)
  }
}
