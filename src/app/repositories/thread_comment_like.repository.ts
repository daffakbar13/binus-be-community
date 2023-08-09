import { ThreadCommentLikes } from 'app/models/thread_comment_likes'
import { ThreadComments } from 'app/models/thread_comments'
import { CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadCommentLikeRepository {
  export async function CreateThreadCommentLike(payload: CreationAttributes<ThreadCommentLikes>) {
    const [like] = await ThreadCommentLikes.findOrCreate({ where: payload, defaults: payload })
    const result = await ThreadCommentLikes.findOne({
      include: [
        {
          model: ThreadComments,
          as: 'comment',
          include: ['thread'],
        },
      ],
      where: { id: like.id },
    })
    return result as ThreadCommentLikes
  }

  export function DeleteThreadCommentLike(where: WhereOptions<ThreadCommentLikes>) {
    return ThreadCommentLikes.destroy({ where })
  }

  export function CountThreadCommentLike(where: WhereOptions<ThreadCommentLikes>) {
    return ThreadCommentLikes.count({ where })
  }
}
