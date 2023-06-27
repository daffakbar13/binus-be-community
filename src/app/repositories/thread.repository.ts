import { Threads } from 'app/models/threads'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadRepository {
  export function GetListThread() {
    return Threads.findAll({
      include: ['tenants', 'community', 'sub_community', 'comments', 'likes'],
    })
  }

  export function GetDetailThread(where: WhereOptions<Threads>) {
    return Threads.findOne({
      where,
      include: ['tenants', 'community', 'sub_community', 'comments', 'likes'],
    })
  }

  export function CreateThread(payload: CreationAttributes<Threads>) {
    return Threads.create(payload)
  }

  export function UpdateThread(
    id: number,
    payload: { [key in keyof Attributes<Threads>]?: Attributes<Threads>[key] },
  ) {
    return Threads.update(payload, { where: { id } })
  }

  export function DeleteThread(where: WhereOptions<Threads>) {
    return Threads.destroy({ where })
  }

  export function IncrementThreadView(where: WhereOptions<Threads>) {
    return Threads.increment({ views: 1 }, { where })
  }
}
