import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { sendResponse } from 'common/dto/sendResponse.dto'

export namespace ErrorMiddleware {
  export function DtoValidator(req: Request, res: Response, next: NextFunction) {
    const validation = validationResult(req)

    if (!validation.isEmpty()) {
      return sendResponse(req, res, baseResponse('BadRequest', validation.array()))
    }

    return next()
  }
}
