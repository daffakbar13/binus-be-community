import jwt from 'jsonwebtoken'
import { getEnv } from 'configs/env'
import { baseResponse } from 'utils/common/dto/baseResponse.dto'
import bcrypt from 'bcrypt'
import { Request } from 'express'
import { AuthDto } from 'app/dto/auth.dto'
import { UserService } from './user.service'

export namespace AuthService {
  export function generateToken<T extends jwt.JwtPayload>(payload: T) {
    return jwt.sign(payload, getEnv('JWT_SECRET_KEY'), {
      expiresIn: getEnv('JWT_EXPIRATION'),
    })
  }

  export async function loginByEmail(email: string) {
    const user = await UserService.getUserByEmail(email)

    if (user) {
      return baseResponse('Ok', { token: generateToken(user.dataValues) })
    }
    return baseResponse('Unauthorized')
  }

  export async function loginByBinusianId(binusian_id: string, password: string) {
    const user = await UserService.getUserByBinusianId(binusian_id)

    if (user) {
      const authorized = bcrypt.compareSync(password, user.password)
      if (authorized) {
        const token = generateToken(user)
        return baseResponse('Ok', { token })
      }
    }

    return baseResponse('Unauthorized')
  }

  export async function login(payload: AuthDto.LoginType) {
    const { email, binusian_id, password } = payload
    if (email) {
      return loginByEmail(email)
    }
    if (binusian_id && password) {
      return loginByBinusianId(binusian_id, password)
    }
    return baseResponse('BadRequest')
  }

  export function verifyToken(headers: Request['headers']) {
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
