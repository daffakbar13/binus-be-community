import { checkExact, param } from 'express-validator'

export namespace ThreadCommentLikeDto {
  export const LikeThreadComment = checkExact([param('id').isFloat({ min: 1 })])
}
