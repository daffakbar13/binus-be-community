import { ThreadLikes } from 'app/models/thread_likes'
import { CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadLikeRepository {
  export async function CreateThreadLike(payload: CreationAttributes<ThreadLikes>) {
    const [like, isLike] = await ThreadLikes.findOrCreate({ where: payload, defaults: payload })
    const result = await ThreadLikes.findOne({ include: ['thread'], where: { id: like.id } })
    return [result, isLike] as [ThreadLikes, boolean]
  }

  export function DeleteThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.destroy({ where })
  }

  export function CountThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.count({ where })
  }
}
