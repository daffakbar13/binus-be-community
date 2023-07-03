import { ThreadComments } from 'app/models/thread_comments'
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize'

export namespace ThreadCommentRepository {
  export function CreateThreadComment(payload: CreationAttributes<ThreadComments>) {
    return ThreadComments.create(payload)
  }

  export function UpdateThreadComment(
    id: number,
    payload: { [key in keyof Attributes<ThreadComments>]?: Attributes<ThreadComments>[key] },
  ) {
    return ThreadComments.update(payload, { where: { id } })
  }

  export function DeleteThreadComment(where: WhereOptions<ThreadComments>) {
    return ThreadComments.destroy({ where })
  }
}
