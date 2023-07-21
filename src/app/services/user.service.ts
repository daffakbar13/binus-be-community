import axios from 'axios'
import { BaseResponse, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'

export namespace UserService {
  const instance = () => {
    const axiosInstance = axios.create({ baseURL: `${getEnv('API_HOST_SOKRATES')}/auth-http/v2` })
    axiosInstance.interceptors.response.use((res) => res.data)
    return axiosInstance
  }
  const authService = instance()

  export async function UserInfo(req: Request) {
    try {
      const result = await authService.get<null, BaseResponse<{ id: number }>>(
        '/superapps/user-info',
        {
          headers: { Authorization: req.headers.authorization },
        },
      )
      return result
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
