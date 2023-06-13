import { Users } from 'app/models/users'
import { checkExact, body } from 'express-validator'

export namespace AuthDto {
  export interface LoginType {
    readonly email?: string
    readonly binusian_id?: string
    readonly password?: string
  }

  export const Login = checkExact([
    body('email').optional().isEmail(),
    body(['binusian_id', 'password']).optional().isString(),
  ])
  export interface DecodedToken extends Users {
    iat?: number
    exp?: number
  }
}
