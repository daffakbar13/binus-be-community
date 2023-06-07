import jwt from 'jsonwebtoken'
import { getEnv } from 'configs/env'
import { baseResponse } from 'utils/common/dto/baseResponse.dto'
import bcrypt from 'bcrypt'
import { Request } from 'express'
import { AuthDto } from 'app/dto/auth.dto'
import { UserService } from './user.service'

export namespace AuthService {
  export function GenerateToken<T extends jwt.JwtPayload>(payload: T) {
    return jwt.sign(payload, getEnv('JWT_SECRET_KEY'), {
      expiresIn: getEnv('JWT_EXPIRATION'),
    })
  }

  export async function LoginByEmail(email: string) {
    const user = await UserService.GetUserByEmail(email)

    if (user) {
      return baseResponse('Ok', { token: GenerateToken(user.dataValues) })
    }
    return baseResponse('Unauthorized')
  }

  export async function LoginByBinusianId(binusian_id: string, password: string) {
    const user = await UserService.GetUserByBinusianId(binusian_id)

    if (user) {
      const authorized = bcrypt.compareSync(password, user.password)
      if (authorized) {
        const token = GenerateToken(user)
        return baseResponse('Ok', { token })
      }
    }

    return baseResponse('Unauthorized')
  }

  export async function Login(payload: AuthDto.LoginType) {
    const { email, binusian_id, password } = payload
    if (email) {
      return LoginByEmail(email)
    }
    if (binusian_id && password) {
      return LoginByBinusianId(binusian_id, password)
    }
    return baseResponse('BadRequest')
  }

  export function VerifyToken(headers: Request['headers']) {
    const { authorization } = headers

    if (authorization && authorization.startsWith('Bearer')) {
      const [, token] = authorization.split(' ')
      try {
        jwt.verify(token, getEnv('JWT_SECRET_KEY'))
        return true
      } catch (error) {
        return false
      }
    }

    return false
  }
}
