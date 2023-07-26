import { body, checkExact, param } from 'express-validator'

export namespace ThreadCommentDto {
  export const CreateThreadComment = checkExact([
    body('comment').isString(),
    body('thread_id').isFloat({ min: 1 }),
  ])

  export const UpdateThreadComment = checkExact([
    param('id').isFloat({ min: 1 }),
    body('comment').optional({ values: 'falsy' }).isString(),
  ])

  export const CommentApproval = checkExact([
    param('id').isFloat({ min: 1 }),
    body('status_id').isFloat({ min: 1 }),
  ])

  export const DeleteThreadComment = checkExact([param('id').isFloat({ min: 1 })])
}
