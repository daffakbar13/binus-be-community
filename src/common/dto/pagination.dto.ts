import { body } from 'express-validator'

export namespace PaginationDto {
  export const RequestPagination = [body(['pagination.page', 'pagination.limit']).isFloat()]
}
