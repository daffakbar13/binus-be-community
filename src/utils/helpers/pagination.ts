import { Request } from 'express'

export function paginationObject(query: Request['query']) {
  const page = Number(query.page || 0) + 1
  const limit = Number(query.limit || 10)
  const offset = page * limit - limit
  return { offset, limit }
}

export function responseWithPagination(
  props: ReturnType<typeof paginationObject> & { rows: Array<any>; count: number },
) {
  const { limit, offset, count, rows } = props
  const page = (offset + limit) / limit - 1
  const total_page = Math.ceil(count / limit)
  const total_rows = count
  return {
    results: rows,
    pagination: { page, limit, total_page, total_rows },
  }
}
