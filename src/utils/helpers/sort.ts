import { Request } from 'express'
import { Order } from 'sequelize'

export function sortRequest(query: Request['query']) {
  const { sort_field, sort_option } = query
  if (sort_field && sort_option) {
    if (['ASC', 'DESC'].includes(sort_option as string)) {
      return [[sort_field, sort_option]] as Order
    }
  }
  return []
}
