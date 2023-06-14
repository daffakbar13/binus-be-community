import jwt from 'jsonwebtoken'
import { getEnv } from 'configs/env'
import { baseResponse } from 'common/dto/baseResponse.dto'
import bcrypt from 'bcrypt'
import { Request } from 'express'
import { AuthDto } from 'app/dto/auth.dto'
import { Users } from 'app/models/users'
import { UserEmails } from 'app/models/user_emails'
import { UserRoles } from 'app/models/user_roles'
import { UserService } from './user.service'

export namespace AuthService {
  type SessionType = Request['session']

  interface MySession extends SessionType {
    last_token?: string
  }

  export function GenerateToken<T extends jwt.JwtPayload>(payload: T, session: MySession) {
    const token = jwt.sign(payload, getEnv('JWT_SECRET_KEY'), {
      expiresIn: getEnv('JWT_EXPIRATION'),
    })

    setTokenSession(session, ['Bearer', token].join(' '))

    return token
  }

  export function getTokenSession(session: MySession) {
    return (session as any).last_token
  }

  export function setTokenSession(session: MySession & { last_token?: string }, token: string) {
    // eslint-disable-next-line no-param-reassign
    session.last_token = token
    session.save()
  }

  export async function LoginByEmail(email: string, session: MySession) {
    const user = await UserService.GetUserByEmail(email)

    if (user) {
      return baseResponse('Ok', { token: GenerateToken(user.dataValues, session) })
    }
    return baseResponse('Unauthorized')
  }

  export async function LoginByBinusianId(
    binusian_id: string,
    password: string,
    session: MySession,
  ) {
    const user = await UserService.GetUserByBinusianId(binusian_id)

    if (user) {
      const authorized = bcrypt.compareSync(password, user.password)
      if (authorized) {
        const token = GenerateToken(user, session)
        return baseResponse('Ok', { token })
      }
    }

    return baseResponse('Unauthorized')
  }

  export async function Login(payload: AuthDto.LoginType, session: MySession) {
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
          name: 'Hasan',
        },
        defaults: {
          name: 'Hasan',
          address: 'Bandung',
          binusian_id: 123,
          birth_date: '13-10-2003',
          nik: '123',
          password: '123',
          profile_picture: 'hasan.jpg',
          user_role_id: 1,
          is_active: true,
        },
      })
      await UserEmails.findOrCreate({
        where: {
          email: 'alvavadev@outlook.com',
        },
        defaults: {
          user_id: 2,
          email: 'alvavadev@outlook.com',
        },
      })
      return LoginByEmail(email, session)
    }
    if (binusian_id && password) {
      return LoginByBinusianId(binusian_id, password, session)
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

  export function VerifyToken(
    headers: Request['headers'],
    session: MySession & { last_token?: string },
  ) {
    const { authorization } = headers
    const token = GetTokenFromHeaders(authorization)

    try {
      if (token) {
        jwt.verify(token, getEnv('JWT_SECRET_KEY'))
      }

      setTokenSession(session, authorization as string)

      return true
    } catch (error) {
      return false
    }
  }

  export function DecodeToken<T = null>(token: string) {
    return jwt.decode(token) as T | null
  }

  export function SSOCheck(session: MySession) {
    const token = getTokenSession(session)

    if (token) {
      const verify = VerifyToken({ authorization: token }, session)
      if (verify) {
        const vanillaToken = GetTokenFromHeaders(token)
        return baseResponse('Ok', { token: vanillaToken })
      }
    }

    return baseResponse('Unauthorized')
  }
}
