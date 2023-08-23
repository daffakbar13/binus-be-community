import { LoggingService } from 'app/services/logging.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace LoggingController {
  export function GetLogging(req: Request, res: Response) {
    const result = LoggingService.GetLogging(req)
    return sendResponse(req, res, result)
  }
}
