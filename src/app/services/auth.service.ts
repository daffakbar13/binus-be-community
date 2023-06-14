import jwt from 'jsonwebtoken'
import { getEnv } from 'configs/env'
import { baseResponse } from 'common/dto/baseResponse.dto'
import bcrypt from 'bcrypt'
import { Request } from 'express'
import { AuthDto } from 'app/dto/auth.dto'
import { Users } from 'app/models/users'
import { UserEmails } from 'app/models/user_emails'
import { UserRoles } from 'app/models/user_roles'
import { cache } from 'configs/cache'
import { UserService } from './user.service'

export namespace AuthService {
  const cacheTokenExpiration = 60 * 60 * 24 * 14

  export function GenerateToken<T extends jwt.JwtPayload>(ip: string, payload: T) {
    const token = jwt.sign(payload, getEnv('JWT_SECRET_KEY'), {
      expiresIn: getEnv('JWT_EXPIRATION'),
    })

    setTokenCache(ip, ['Bearer', token].join(' '))

    return token
  }

  // export function getMachineId() {
  //   return machineIdSync(true)
  // }

  export function setTokenCache(ip: string, token: string) {
    cache.set(ip, { token }, cacheTokenExpiration)
  }

  export function getTokenCache(ip: string) {
    return cache.get<{ token: string }>(ip)
  }

  export async function LoginByEmail(ip: string, email: string) {
    const user = await UserService.GetUserByEmail(email)

    if (user) {
      return baseResponse('Ok', { token: GenerateToken(ip, user.dataValues) })
    }
    return baseResponse('Unauthorized')
  }

  export async function LoginByBinusianId(ip: string, binusian_id: string, password: string) {
    const user = await UserService.GetUserByBinusianId(binusian_id)

    if (user) {
      const authorized = bcrypt.compareSync(password, user.password)
      if (authorized) {
        const token = GenerateToken(ip, user)
        return baseResponse('Ok', { token })
      }
    }

    return baseResponse('Unauthorized')
  }

  export async function Login(ip: string, payload: AuthDto.LoginType) {
    const { email, binusian_id, password } = payload
    if (email) {
      await UserRoles.findOrCreate({
        where: { id: 1 },
        defaults: {
          role: 'Admin',
        },
      })
      await Users.findOrCreate({
        where: {
          name: 'Daffa',
        },
        defaults: {
          name: 'Daffa',
          address: 'Bandung',
          binusian_id: 123,
          birth_date: '13-10-2003',
          nik: '123',
          password: '123',
          profile_picture: 'daffa.jpg',
          user_role_id: 1,
          is_active: true,
        },
      })
      await UserEmails.findOrCreate({
        where: {
          email: 'daffaraihan03@gmail.com',
        },
        defaults: {
          user_id: 1,
          email: 'daffaraihan03@gmail.com',
        },
      })
      return LoginByEmail(ip, email)
    }
    if (binusian_id && password) {
      return LoginByBinusianId(ip, binusian_id, password)
    }
    return baseResponse('BadRequest')
  }

  export function GetTokenFromHeaders(authorization?: string) {
    if (authorization && authorization.startsWith('Bearer')) {
      const [, token] = authorization.split(' ')
      return token
    }
    return null
  }

  export function VerifyToken(ip: string, headers: Request['headers']) {
    const { authorization } = headers
    const token = GetTokenFromHeaders(authorization)

    try {
      if (token) {
        jwt.verify(token, getEnv('JWT_SECRET_KEY'))
      }

      setTokenCache(ip, authorization as string)
      return true
    } catch (error) {
      return false
    }
  }

  export function DecodeToken<T = null>(token: string) {
    return jwt.decode(token) as T | null
  }

  export function SSOCheck(ip: string) {
    const tokenCache = getTokenCache(ip)

    if (tokenCache) {
      const { token } = tokenCache
      const verify = VerifyToken(ip, { authorization: token })
      if (verify) {
        const vanillaToken = GetTokenFromHeaders(token)
        return baseResponse('Ok', { token: vanillaToken, ip })
      }
    }

    return baseResponse('Unauthorized')
  }
}
