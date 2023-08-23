import { SubCommunityMemberService } from 'app/services/sub_community_member.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace SubCommunityMemberController {
  export async function GetAllSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.GetAllSubCommunityMember(req)
    return sendResponse(req, res, result)
  }

  export async function GetSubCommunityMemberList(req: Request, res: Response) {
    const result = await SubCommunityMemberService.GetSubCommunityMemberList(req)
    return sendResponse(req, res, result)
  }

  export async function RequestSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.RequestSubCommunityMember(req)
    return sendResponse(req, res, result)
  }

  export async function ApproveSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.ApproveSubCommunityMember(req)
    return sendResponse(req, res, result)
  }

  export async function CancelSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.CancelSubCommunityMember(req)
    return sendResponse(req, res, result)
  }

  export async function DeleteSubCommunityMember(req: Request, res: Response) {
    const result = await SubCommunityMemberService.DeleteSubCommunityMember(req)
    return sendResponse(req, res, result)
  }
}
