import { ThreadCommentService } from 'app/services/thread_comment.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace ThreadCommentController {
  export async function GetListThreadComment(req: Request, res: Response) {
    const result = await ThreadCommentService.GetListThreadComment(req)
    return sendResponse(res, result)
  }

  export async function CreateThreadComment(req: Request, res: Response) {
    const result = await ThreadCommentService.CreateThreadComment(req)
    return sendResponse(res, result)
  }

  export async function UpdateThreadComment(req: Request, res: Response) {
    const result = await ThreadCommentService.UpdateThreadComment(req)
    return sendResponse(res, result)
  }

  export async function DeleteThreadComment(req: Request, res: Response) {
    const result = await ThreadCommentService.DeleteThreadComment(req)
    return sendResponse(res, result)
  }
}
