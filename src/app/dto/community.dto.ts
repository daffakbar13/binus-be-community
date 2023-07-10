import { PaginationDto } from 'common/dto/pagination.dto'
import { SearchDto } from 'common/dto/search'
import { body, checkExact, param, query } from 'express-validator'

export namespace CommunityDto {
  export const ListCommunity = checkExact([
    ...PaginationDto.RequestPagination,
    SearchDto.SearchRequest,
    query('is_active').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const DetailCommunity = checkExact([param('id').isFloat({ min: 1 })])

  export const CreateCommunity = checkExact([body(['name', 'description']).isString()])

  export const UpdateCommunity = checkExact([
    body(['name', 'description']).optional({ values: 'falsy' }).isString(),
    body('is_active').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const DeleteCommunity = checkExact([param('id').isFloat({ min: 1 })])
}
