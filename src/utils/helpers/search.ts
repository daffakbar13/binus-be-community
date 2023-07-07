import { Attributes, Model, Op } from 'sequelize'

export function searchRequest<T extends Model>(fields: (keyof Attributes<T>)[], value?: string) {
  if (value) {
    const result = fields.map((f) => ({ [f]: { [Op.iLike]: `%${value}%` } }))
    return { [Op.or]: result }
  }
  return {}
}
