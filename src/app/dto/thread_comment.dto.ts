import { body, checkExact, param } from 'express-validator'

export namespace ThreadCommentDto {
  export const CreateThreadComment = checkExact([
    body('comment').isString(),
    body('thread_id').isFloat({ min: 1 }),
  ])

  export const UpdateThreadComment = checkExact([
    body('comment').optional({ values: 'falsy' }).isString(),
  ])

  export const DeleteThreadComment = checkExact([param('id').isFloat({ min: 1 })])
}
