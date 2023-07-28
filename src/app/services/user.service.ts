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
    relations: string[] = [],
  ) {
    try {
      const user_ids: number[] = []
      const isArray = Array.isArray(data)
      if (isArray) {
        user_ids.push(...new Set(data.map((d) => d.user_id)))
        relations.forEach((key) =>
          user_ids.push(...new Set([...user_ids, ...data.map((d: any) => d[key].user_id)])),
        )
      } else {
        user_ids.push(data.user_id)
      }
      if (user_ids.length > 0) {
        const users = await GetUserByIds(req, { user_ids: JSON.stringify(user_ids) })
        if (users.data) {
          const getUserById = (id: number) => users.data.find((u) => u.id === id)
          if (isArray) {
            const result = data.map((d: any) => {
              const end = {}
              relations.forEach((r) => {
                Object.assign(end, { [r]: { ...d[r].dataValues, user: getUserById(d[r].user_id) } })
              })
              return {
                ...d.dataValues,
                user: getUserById(d.user_id),
                ...end,
              }
            })
            return baseResponse('Ok', result)
          }
          const end = {}
          relations.forEach((r) => {
            Object.assign(end, {
              [r]: { ...(data as any)[r].dataValues, user: getUserById((data as any)[r].user_id) },
            })
          })
          return baseResponse('Ok', {
            ...data.dataValues,
            user: getUserById(data.user_id),
            ...end,
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
