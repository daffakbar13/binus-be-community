import { PaginationDto } from 'common/dto/pagination.dto'
import { SearchDto } from 'common/dto/search'
import { body, checkExact, param, query } from 'express-validator'

export namespace SubCommunityDto {
  export const ListSubCommunity = checkExact([
    ...PaginationDto.RequestPagination,
    SearchDto.SearchRequest,
    query('is_active').optional({ values: 'falsy' }).isBoolean(),
    query('community_id').optional({ values: 'falsy' }).isFloat({ min: 1 }),
    query('tenant_uuid').optional({ values: 'falsy' }).isString(),
  ])

  export const DetailSubCommunity = checkExact([param('id').isFloat({ min: 1 })])

  export const CreateSubCommunity = checkExact([
    body(['name', 'description']).isString(),
    body('community_id').isFloat({ min: 1 }),
  ])

  export const UpdateSubCommunity = checkExact([
    body(['name', 'description']).optional({ values: 'falsy' }).isString(),
    body('community_id').optional({ values: 'falsy' }).isFloat({ min: 1 }),
    body('is_active').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const DeleteSubCommunity = checkExact([param('id').isFloat({ min: 1 })])
}
