import { body, checkExact, param } from 'express-validator'

export namespace BannerDto {
  export const DetailBanner = param('id').isNumeric()

  export const CreateBanner = checkExact([
    body(['title', 'description']).isString(),
    body('tenant_ids').optional({ values: 'falsy' }).isArray(),
    body('external_url').isURL({
      protocols: ['http', 'https'],
      require_protocol: true,
      require_valid_protocol: true,
    }),
    body(['start_date', 'end_date']).isISO8601(),
  ])

  export const UpdateBanner = checkExact([
    body(['title', 'description']).optional({ values: 'falsy' }).isString(),
    body('tenant_ids').optional({ values: 'falsy' }).isArray(),
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
