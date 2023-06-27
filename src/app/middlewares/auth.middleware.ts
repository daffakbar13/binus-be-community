import { NextFunction, Request, Response } from 'express'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { AuthService } from 'app/services/auth.service'

export namespace AuthMiddleware {
  export async function checkAuthenticate(req: Request, res: Response, next: NextFunction) {
    const verify = await AuthService.CheckToken(req)

    if (!verify) {
      return sendResponse(res, baseResponse('Unauthorized'))
    }

    return next()
  }
}
