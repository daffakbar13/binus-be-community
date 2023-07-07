import { query } from 'express-validator'

export namespace SortDto {
  export interface SortObjectType {
    offset: number
    limit: number
  }

  export interface RequestSortType {
    page: number
    limit: number
  }
  export function RequestSort(...field: string[]) {
    return [
      query('sort_field').optional({ values: 'falsy' }).isIn(field),
      query('sort_option').optional({ values: 'falsy' }).toUpperCase().isIn(['ASC', 'DESC']),
    ]
  }
}
