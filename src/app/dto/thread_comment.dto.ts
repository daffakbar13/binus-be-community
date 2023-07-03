import { body, checkExact } from 'express-validator'

export namespace ThreadCommentDto {
  export const CreateThreadComment = checkExact([
    body('comment').isString(),
    body('thread_id').isFloat(),
  ])
}
