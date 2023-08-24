import { UserDto } from 'app/dto/user.dto'
import axios from 'axios'
import { BaseResponse, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'
import { Constant } from 'common/constants'
import { LoggingService } from './logging.service'

export namespace AuthService {
  const instance = () => {
    const axiosInstance = axios.create({ baseURL: `${getEnv('API_GATEWAY_HOST')}/v1/auth` })
    axiosInstance.interceptors.response.use((res) => res.data)

    return axiosInstance
  }

  const authService = instance()

  export async function CheckToken(req: Request) {
    try {
      const { authorization, xid } = req.headers
      const result = await authService.get<null, BaseResponse<UserDto.User>>('/token/verify', {
        headers: { Authorization: authorization, xid },
      })

      if (result.data && result.status === 200) {
        req.session.user = result.data
        return true
      }
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, JSON.stringify(err))
      return false
    }
    return false
  }

  export async function DecodeToken(req: Request) {
    try {
      const { authorization, xid } = req.headers
      const result = await authService.get('/token/decode', {
        headers: { Authorization: authorization, xid },
      })
      return result
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, JSON.stringify(err))
      return baseResponse('InternalServerError')
    }
  }
}
