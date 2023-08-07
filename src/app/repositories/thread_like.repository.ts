import { ThreadLikes } from 'app/models/thread_likes'
import { CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadLikeRepository {
  export function CreateThreadLike(payload: CreationAttributes<ThreadLikes>) {
    return ThreadLikes.findOrCreate({ include: ['thread'], where: payload, defaults: payload })
  }

  export function DeleteThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.destroy({ where })
  }

  export function CountThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.count({ where })
  }
}
