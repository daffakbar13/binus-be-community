import { PaginationDto } from 'common/dto/pagination.dto'
import { SearchDto } from 'common/dto/search'
import { body, checkExact, param, query } from 'express-validator'

export namespace CommunityDto {
  export const GetCommunityList = checkExact([
    ...PaginationDto.RequestPagination,
    SearchDto.SearchRequest,
    query('is_active').optional({ values: 'falsy' }).isBoolean(),
    query('is_member_type').optional({ values: 'falsy' }).isBoolean(),
    query('tenant_uuid').optional({ values: 'falsy' }).isString(),
  ])

  export const GetCommunityDetail = checkExact([param('id').isFloat({ min: 1 })])

  export const CreateCommunity = checkExact([
    body(['name', 'description']).isString(),
    body('tenant_uuid').isString(),
    body(['is_parent', 'is_teacher', 'is_student']).isBoolean(),
  ])

  export const UpdateCommunity = checkExact([
    body(['name', 'description']).optional({ values: 'falsy' }).isString(),
    body('is_active').optional({ values: 'falsy' }).isBoolean(),
    body(['is_parent', 'is_teacher', 'is_student']).optional({ values: 'falsy' }).isBoolean(),
  ])

  export const DeleteCommunity = checkExact([param('id').isFloat({ min: 1 })])
}
