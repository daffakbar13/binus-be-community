import { ThreadLikes } from 'app/models/thread_likes'
import { CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadLikeRepository {
  export function GetDetailThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.findOne({ where })
  }

  export function CreateThreadLike(payload: CreationAttributes<ThreadLikes>) {
    return ThreadLikes.create(payload)
  }

  export function DeleteThreadLike(where: WhereOptions<ThreadLikes>) {
    return ThreadLikes.destroy({ where })
  }
}
