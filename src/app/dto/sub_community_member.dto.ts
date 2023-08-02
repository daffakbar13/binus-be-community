import { PaginationDto } from 'common/dto/pagination.dto'
import { body, checkExact, param, query } from 'express-validator'

export namespace SubCommunityMemberDto {
  export const GetSubCommunityMemberList = checkExact([
    ...PaginationDto.RequestPagination,
    param('id').isFloat({ min: 1 }),
    query('is_approved').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const RequestSubCommunityMember = checkExact([param('id').isFloat({ min: 1 })])

  export const ApproveSubCommunityMember = checkExact([
    param('id').isFloat({ min: 1 }),
    body('user_ids').optional({ values: 'falsy' }).isArray(),
  ])

  export const DeleteSubCommunityMember = ApproveSubCommunityMember

  export const CancelSubCommunityMember = ApproveSubCommunityMember
}
