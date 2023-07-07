import { checkExact, param } from 'express-validator'

export namespace ThreadLikeDto {
  export const LikeThread = checkExact([param('id').isFloat({ min: 1 })])
}
