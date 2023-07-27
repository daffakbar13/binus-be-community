import { UserDto } from 'app/dto/user.dto'
import axios from 'axios'
import { BaseResponseSokrates, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'
import { Model } from 'sequelize'

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

  export async function GetUserByIds(req: Request, params: { user_ids: string }) {
    try {
      const result = await authService.get<null, BaseResponseSokrates<UserDto.User[]>>(
        '/superapps/user-list',
        {
          headers: { Authorization: req.headers.authorization },
          params,
        },
      )
      return result
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMappedUsers<T extends Model = Model>(
    req: Request,
    data: ({ user_id: number } & T) | ({ user_id: number } & T)[],
  ) {
    try {
      const user_ids = []
      const isArray = Array.isArray(data)
      if (isArray) {
        user_ids.push(...new Set(data.map((d) => d.user_id)))
      } else {
        user_ids.push(data.user_id)
      }
      if (user_ids.length > 0) {
        const users = await GetUserByIds(req, { user_ids: JSON.stringify(user_ids) })
        if (users.data) {
          if (isArray) {
            const result = data.map((d) => ({
              ...d.dataValues,
              user: users.data.find((u) => u.id === d.user_id),
            }))
            return baseResponse('Ok', result)
          }
          return baseResponse('Ok', {
            ...data.dataValues,
            user: users.data.find((u) => u.id === data.user_id),
          })
        }
        return baseResponse('InternalServerError')
      }
      return baseResponse('Ok', data)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
