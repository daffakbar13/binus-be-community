import { UserDto } from 'app/dto/user.dto'
import axios from 'axios'
import { BaseResponseSokrates, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'

export namespace NotificationService {
  const instance = () => {
    const axiosInstance = axios.create({
      baseURL: `${getEnv('API_GATEWAY_HOST')}/v1/superapps/notifications`,
    })
    axiosInstance.interceptors.response.use((res) => res.data)
    return axiosInstance
  }
  const notificationService = instance()

  // eslint-disable-next-line no-shadow
  export enum NotificationTypes {
    // eslint-disable-next-line no-unused-vars
    GLOBAL = 1,
    // eslint-disable-next-line no-unused-vars
    ARTICLES = 2,
    // eslint-disable-next-line no-unused-vars
    VIDEOS = 3,
    // eslint-disable-next-line no-unused-vars
    UPDATES = 4,
    // eslint-disable-next-line no-unused-vars
    MINIAPPS = 5,
    // eslint-disable-next-line no-unused-vars
    UPDATESCOMMUNITY = 6,
    // eslint-disable-next-line no-unused-vars
    THREADS = 7,
    // eslint-disable-next-line no-unused-vars
    COMMUNITY = 8,
    // eslint-disable-next-line no-unused-vars
    SUBCOMMUNITY = 9,
  }

  export type RecipientTypes = 'all-users' | 'community' | 'specific-user'

  export interface CreateNotification {
    recipient_type: RecipientTypes
    title: string
    body: string
    type_id?: number
    community_id?: number
    sub_community_id?: number
    publish_date?: Date
    user_ids?: number[]
    tenant_uuids?: string[]
    data?: { [x: string]: string }
  }

  export async function CreateNotification(req: Request, payload: CreateNotification) {
    try {
      const result = await notificationService.post<null, BaseResponseSokrates<UserDto.User>>(
        '/create',
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
}
