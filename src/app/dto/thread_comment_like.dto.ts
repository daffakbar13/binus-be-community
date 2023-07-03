import { param } from 'express-validator'

export namespace ThreadCommentLikeDto {
  export const LikeThreadComment = param('id').isFloat()
}
