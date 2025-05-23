import { checkExact, param } from 'express-validator'

export namespace MasterStatusDto {
  export const MasterStatusList = checkExact([
    param('type').optional({ values: 'falsy' }).isString(),
  ])

  export const GetMasterStatusDetail = checkExact([param('id').isFloat({ min: 1 })])
}
