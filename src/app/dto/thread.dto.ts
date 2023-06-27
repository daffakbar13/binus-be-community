import { body, checkExact, param } from 'express-validator'

export namespace ThreadDto {
  export const DetailThread = param('id').isNumeric()

  export const CreateThread = checkExact([
    body(['title', 'content', 'tags']).isString(),
    body(['community_id', 'sub_community_id']).optional({ checkFalsy: true }).isString(),
    body(['tenant_ids']).optional({ checkFalsy: true }).isArray(),
  ])
}
