import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { baseResponse } from 'utils/common/dto/baseResponse.dto'

export namespace ErrorMiddleware {
  export function DtoValidator(req: Request, res: Response, next: NextFunction) {
    const validation = validationResult(req)

    if (!validation.isEmpty()) {
      return res.status(400).send(baseResponse('BadRequest', validation.array()))
    }

    return next()
  }
}
