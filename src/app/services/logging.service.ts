import { Request } from 'express'
import { cache } from 'configs/cache'
import { BaseResponse, baseResponse } from 'common/dto/baseResponse.dto'
import { LoggingDto } from 'app/dto/logging.dto'
import { Constant } from 'common/constants'
import { format } from 'util'

export namespace LoggingService {
  export function GetLogging(req: Request) {
    const xid = req.params.xid as string
    const result = getLogs().filter((l) => l.xid === xid)
    return baseResponse('Ok', result)
  }

  export function CreateLogging(req: Request, response?: BaseResponse<any>) {
    const { body, headers, method, originalUrl, query } = req
    const token = headers.authorization
    const xid = headers.xid as string

    const log: LoggingDto.Log = {
      app: Constant.APP_NAME,
      path: originalUrl,
      method,
      token,
      xid,
      query,
      body,
      errors: getErrors(req),
      response,
    }
    cache.set(Constant.LOG_KEY, [...getLogs(), log], Constant.LOG_CACHE_EXP)
  }

  export function Error(req: Request, baseErr: string, ...err: any[]) {
    const errors = getErrors(req)

    req.res?.set(Constant.ERR_APP, [
      ...errors,
      format(baseErr, ...err.map((e: any) => JSON.stringify(e))),
    ])
  }

  const getErrors = (req: Request) => (req.res?.get(Constant.ERR_APP) || []) as Array<any>

  const getLogs = () => cache.get<LoggingDto.Log[]>(Constant.LOG_KEY) || []
}
