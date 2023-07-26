import { UserDto } from 'app/dto/user.dto'
import axios from 'axios'
import { BaseResponseSokrates, baseResponse } from 'common/dto/baseResponse.dto'
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
      const result = await authService.get<null, BaseResponseSokrates<UserDto.User>>(
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

  export async function GetUserByIds(req: Request, payload: { ids: number[] }) {
    try {
      const result = await authService.post<null, BaseResponseSokrates<UserDto.User[]>>(
        '/superapps/user-info',
        payload,
        {
          headers: { Authorization: req.headers.authorization },
        },
      )
      return result
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMappedUsers<T extends object = {}>(
    req: Request,
    data: ({ user_id: number } & T) | ({ user_id: number } & T)[],
  ) {
    try {
      const ids = []
      const isArray = Array.isArray(data)
      if (isArray) {
        ids.push(...new Set(data.map((d) => d.user_id)))
      } else {
        ids.push(data.user_id)
      }
      const users = await GetUserByIds(req, { ids })
      if (users.data) {
        if (isArray) {
          const result = data.map((d) => ({
            ...d,
            user: users.data.find((u) => u.id === d.user_id),
          }))
          return baseResponse('Ok', result)
        }
        return baseResponse('Ok', { ...data, user: users.data.find((u) => u.id === data.user_id) })
      }
      return baseResponse('InternalServerError')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
