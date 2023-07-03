import { ThreadCommentLikes } from 'app/models/thread_comment_likes'
import { CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadCommentLikeRepository {
  export function GetDetailThreadCommentLike(where: WhereOptions<ThreadCommentLikes>) {
    return ThreadCommentLikes.findOne({ where })
  }

  export function CreateThreadCommentLike(payload: CreationAttributes<ThreadCommentLikes>) {
    return ThreadCommentLikes.create(payload)
  }

  export function DeleteThreadCommentLike(where: WhereOptions<ThreadCommentLikes>) {
    return ThreadCommentLikes.destroy({ where })
  }
}
