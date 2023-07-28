import { PaginationDto } from 'common/dto/pagination.dto'
import { body, checkExact, param, query } from 'express-validator'

export namespace BannerDto {
  export const GetBannerList = checkExact([
    ...PaginationDto.RequestPagination,
    query('tenant_uuid').optional({ values: 'falsy' }).isString(),
    query('is_active').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const GetBannerDetail = checkExact([param('id').isFloat({ min: 1 })])

  export const CreateBanner = checkExact([
    body(['title', 'description']).isString(),
    body('tenant_uuid').isString(),
    body('external_url')
      .optional({ values: 'falsy' })
      .isURL({
        protocols: ['http', 'https'],
        require_protocol: true,
        require_valid_protocol: true,
      }),
    body(['start_date', 'end_date']).isISO8601(),
  ])

  export const UpdateBanner = checkExact([
    body(['title', 'description']).optional({ values: 'falsy' }).isString(),
    body('external_url')
      .optional({ values: 'falsy' })
      .isURL({
        protocols: ['http', 'https'],
        require_protocol: true,
        require_valid_protocol: true,
      }),
    body(['start_date', 'end_date']).isISO8601(),
    body('is_active').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const DeleteBanner = checkExact([param('id').isFloat({ min: 1 })])
}
