import { body, checkExact, param } from 'express-validator'

export namespace BannerDto {
  export const DetailBanner = param('id').isFloat()

  export const CreateBanner = checkExact([
    body(['title', 'description']).isString(),
    body(['community_id']).optional({ checkFalsy: true }).isFloat(),
    body(['tenant_ids']).optional({ checkFalsy: true }).isArray(),
    body(['external_url']).isURL(),
    body(['start_date', 'end_date']).isISO8601(),
  ])
}
