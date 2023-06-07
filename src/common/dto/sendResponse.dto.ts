import { Response } from 'express'
import { baseResponse } from './baseResponse.dto'

export function sendResponse(res: Response, result: ReturnType<typeof baseResponse>) {
  res.status(result.status).send(result)
}
