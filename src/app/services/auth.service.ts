import { UserDto } from 'app/dto/user.dto'
import axios from 'axios'
import { BaseResponse, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'

export namespace AuthService {
  const instance = () => {
    const axiosInstance = axios.create({ baseURL: `${getEnv('API_GATEWAY_HOST')}/v1/auth` })
    axiosInstance.interceptors.response.use((res) => res.data)

    return axiosInstance
  }

  const authService = instance()

  export async function CheckToken(req: Request) {
    try {
      const result = await authService.get<null, BaseResponse<UserDto.User>>('/token/verify', {
        headers: { Authorization: req.headers.authorization },
      })

      if (result.data && result.status === 200) {
        req.session.user = result.data
        return true
      }
    } catch (err) {
      return false
    }
    return false
  }

  export async function DecodeToken(req: Request) {
    try {
      const result = await authService.get('/token/decode', {
        headers: req.headers,
      })
      return result
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
