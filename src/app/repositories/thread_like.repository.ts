import { ThreadLikes } from 'app/models/thread_likes'
import { CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadLikeRepository {
  export async function CreateThreadLike(payload: CreationAttributes<ThreadLikes>) {
    const like = await ThreadLikes.create(payload)
    const result = await ThreadLikes.findOne({ include: ['thread'], where: { id: like.id } })
    return result as ThreadLikes
  }

  export function DeleteThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.destroy({ where })
  }

  export function CountThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.count({ where })
  }
}
