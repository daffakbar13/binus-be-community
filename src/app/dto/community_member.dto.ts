import { PaginationDto } from 'common/dto/pagination.dto'
import { body, checkExact, param, query } from 'express-validator'

export namespace CommunityMemberDto {
  export const GetCommunityMemberList = checkExact([
    ...PaginationDto.RequestPagination,
    param('id').isFloat({ min: 1 }),
    query('is_approved').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const RequestCommunityMember = checkExact([param('id').isFloat({ min: 1 })])

  export const ApproveCommunityMember = checkExact([
    param('id').isFloat({ min: 1 }),
    body('user_ids').optional({ values: 'falsy' }).isArray(),
  ])

  export const DeleteCommunityMember = ApproveCommunityMember
}
