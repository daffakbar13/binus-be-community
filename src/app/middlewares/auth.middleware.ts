import { AuthService } from 'app/services/auth.service'
import { NextFunction, Request, Response } from 'express'
import { baseResponse } from 'utils/common/dto/baseResponse.dto'

function checkAuthenticate(req: Request, res: Response, next: NextFunction) {
  const verify = AuthService.verifyToken(req.headers)
  if (!verify) {
    res.status(401).send(baseResponse('Unauthorized'))
  }
  next()
}

export const AuthMiddleware = { checkAuthenticate }
