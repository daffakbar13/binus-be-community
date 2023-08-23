import { Request, Response } from 'express'
import { LoggingService } from 'app/services/logging.service'
import { BaseResponse } from './baseResponse.dto'

export function sendResponse(req: Request, res: Response, result: BaseResponse<any>) {
  const response = { ...result, xid: req.headers.xid }
  LoggingService.CreateLogging(req, response)
  res.status(result.status).send(response)
}
