import { ThreadComments } from 'app/models/thread_comments'
import { Threads } from 'app/models/threads'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadRepository {
  const relations = [
    'tenants',
    'community',
    'sub_community',
    'likes',
    {
      model: ThreadComments,
      as: 'comments',
      include: ['likes'],
    },
  ]
  export function GetListThread() {
    return Threads.findAll({ include: relations })
  }

  export function GetDetailThread(where: WhereOptions<Threads>) {
    return Threads.findOne({ where, include: relations })
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
