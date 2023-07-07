import { ThreadCommentLikes } from 'app/models/thread_comment_likes'
import { CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadCommentLikeRepository {
  export function CreateThreadCommentLike(payload: CreationAttributes<ThreadCommentLikes>) {
    return ThreadCommentLikes.findOrCreate({ where: payload, defaults: payload })
  }

  export function DeleteThreadCommentLike(where: WhereOptions<ThreadCommentLikes>) {
    return ThreadCommentLikes.destroy({ where })
  }

  export function CountThreadCommentLike(where: WhereOptions<ThreadCommentLikes>) {
    return ThreadCommentLikes.count({ where })
  }
}
