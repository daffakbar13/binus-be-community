import { PaginationDto } from 'common/dto/pagination.dto'
import { SearchDto } from 'common/dto/search'
import { SortDto } from 'common/dto/sort.dto'
import { body, checkExact, param, query } from 'express-validator'

export namespace ThreadDto {
  export const ListThread = checkExact([
    ...PaginationDto.RequestPagination,
    ...SortDto.RequestSort('id', 'views'),
    SearchDto.SearchRequest,
    query('is_active').optional({ values: 'falsy' }).isBoolean(),
    query('is_pinned').optional({ values: 'falsy' }).isBoolean(),
    query('is_my_thread').optional({ values: 'falsy' }).isBoolean(),
    query(['status_id', 'sub_community_id']).optional({ values: 'falsy' }).isFloat({ min: 1 }),
  ])

  export const ListMyThread = checkExact([...PaginationDto.RequestPagination])

  export const DetailThread = checkExact([
    param('id').isFloat({ min: 1 }),
    query('increase_view').optional({ values: 'falsy' }).isBoolean(),
  ])

  export const CreateThread = checkExact([
    body(['title', 'content', 'tags']).isString(),
    body(['community_id', 'sub_community_id']).optional({ values: 'falsy' }).isFloat({ min: 1 }),
    body('tenant_ids').optional({ values: 'falsy' }).isArray(),
  ])

  export const ThreadApproval = checkExact([
    param('id').isFloat({ min: 1 }),
    body('status_id').isFloat({ min: 1 }),
  ])

  export const UpdateThread = checkExact([
    body(['title', 'content', 'tags']).optional({ values: 'falsy' }).isString(),
    body(['community_id', 'sub_community_id']).optional({ values: 'falsy' }).isFloat({ min: 1 }),
    body('tenant_ids').optional({ values: 'falsy' }).isArray(),
    body(['is_allow_comment', 'is_active']).optional({ values: 'falsy' }).isBoolean(),
  ])

  export const DeleteThread = checkExact([param('id').isFloat({ min: 1 })])
}
