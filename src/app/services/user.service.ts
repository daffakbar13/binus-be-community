import { UserRepository } from 'app/repositories/user.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { AuthDto } from 'app/dto/auth.dto'
import { AuthService } from './auth.service'

export namespace UserService {
  export async function GetUserByEmail(email: string) {
    const result = await UserRepository.GetUserByEmail(email)
    return result
  }

  export async function GetUserByBinusianId(binusian_id: string) {
    const result = await UserRepository.GetUserByBinusianId(binusian_id)
    return result
  }

  export async function UserInfo(authorization?: string) {
    const token = AuthService.GetTokenFromHeaders(authorization)

    if (token) {
      const decodedToken = AuthService.DecodeToken<AuthDto.DecodedToken>(token)
      if (decodedToken) {
        delete decodedToken.iat
        delete decodedToken.exp

        return baseResponse('Ok', decodedToken)
      }
    }
    return baseResponse('Unauthorized')
  }
}
