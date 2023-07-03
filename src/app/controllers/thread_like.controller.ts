import { ThreadLikeService } from 'app/services/thread_like.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace ThreadLikeController {
  export async function Like(req: Request, res: Response) {
    const result = await ThreadLikeService.LikeThread(req)
    return sendResponse(res, result)
  }

  export async function Unlike(req: Request, res: Response) {
    const result = await ThreadLikeService.UnlikeThread(req)
    return sendResponse(res, result)
  }
}
