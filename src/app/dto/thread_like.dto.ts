import { param } from 'express-validator'

export namespace ThreadLikeDto {
  export const LikeThread = param('id').isNumeric()
}
