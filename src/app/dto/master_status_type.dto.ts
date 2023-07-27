import { checkExact, param } from 'express-validator'

export namespace MasterStatusTypeDto {
  export const GetMasterStatusTypeDetail = checkExact([param('id').isString()])
}
