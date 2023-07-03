import { ThreadCommentLikeService } from 'app/services/thread_comment_like.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace ThreadCommentLikeController {
  export async function Like(req: Request, res: Response) {
    const result = await ThreadCommentLikeService.LikeThreadComment(req)
    return sendResponse(res, result)
  }

  export async function Unlike(req: Request, res: Response) {
    const result = await ThreadCommentLikeService.UnlikeThreadComment(req)
    return sendResponse(res, result)
  }
}
