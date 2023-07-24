import { checkExact, param } from 'express-validator'

export namespace MasterStatusTypeDto {
  export const DetailMasterStatusType = checkExact([param('id').isString()])
}
