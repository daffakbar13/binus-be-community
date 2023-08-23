import { checkExact, param } from 'express-validator'

export namespace LoggingDto {
  export interface Log {
    app: string
    path: string
    method: string
    token?: string
    xid: string
    query: object
    body?: object
    errors: Array<any>
    response: any
  }
  export const GetLogging = checkExact([param('xid').isUUID()])
}
