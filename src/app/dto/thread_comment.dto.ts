import { body, checkExact } from 'express-validator'

export namespace ThreadCommentDto {
  export const CreateThreadComment = checkExact([body(['comment', 'thread_id']).isString()])
}
