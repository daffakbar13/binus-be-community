import { AuthService } from 'app/services/auth.service'
import { NextFunction, Request, Response } from 'express'
import { baseResponse } from 'utils/common/dto/baseResponse.dto'
import { sendResponse } from 'utils/common/dto/sendResponse.dto'

export namespace AuthMiddleware {
  export function checkAuthenticate(req: Request, res: Response, next: NextFunction) {
    const verify = AuthService.VerifyToken(req.headers)
    if (!verify) {
      return sendResponse(res, baseResponse('Unauthorized'))
    }
    return next()
  }
}
