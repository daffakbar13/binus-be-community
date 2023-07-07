import { query } from 'express-validator'

export namespace PaginationDto {
  export interface PaginationObjectType {
    offset: number
    limit: number
  }

  export interface RequestPaginationType {
    page: number
    limit: number
  }
  export const RequestPagination = [
    query('page').optional({ values: 'falsy' }).isFloat({ min: 0 }),
    query('limit').optional({ values: 'falsy' }).isFloat({ min: 1, max: 100 }),
  ]
}
