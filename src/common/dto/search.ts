import { query } from 'express-validator'

export namespace SearchDto {
  export const SearchRequest = query('search').optional({ values: 'falsy' }).isString()
}
