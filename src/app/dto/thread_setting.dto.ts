import { body, checkExact, param, query } from 'express-validator'
import { SortDto } from 'common/dto/sort.dto'

export namespace ThreadSettingDto {
  export const GetThreadSettingList = checkExact([
    ...SortDto.RequestSort('id'),
    query('tenant_uuid').optional({ values: 'falsy' }).isString(),
  ])

  export const UpdateThreadSetting = checkExact([
    param('id').isFloat({ min: 1 }),
    body('need_approval').optional({ values: 'falsy' }).isBoolean(),
  ])
}
