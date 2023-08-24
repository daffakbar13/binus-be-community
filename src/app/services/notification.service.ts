/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { UserDto } from 'app/dto/user.dto'
import axios from 'axios'
import { BaseResponseSokrates, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'
import { Constant } from 'common/constants'
import { LoggingService } from './logging.service'

export namespace NotificationService {
  const instance = () => {
    const axiosInstance = axios.create({
      baseURL: `${getEnv('API_GATEWAY_HOST')}/v1/superapps/notifications`,
    })
    axiosInstance.interceptors.response.use((res) => res.data)
    return axiosInstance
  }
  const notificationService = instance()

  export enum NotificationTypes {
    GLOBAL = 1,
    ARTICLE = 2,
    VIDEO = 3,
    BANNER = 4,
    MINIAPP = 5,
    BANNERCOMMUNITY = 6,
    THREAD = 7,
    COMMUNITY = 8,
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
      LoggingService.Error(req, Constant.ERR_SUPERAPPS_SERVICE, JSON.stringify(err))
      return baseResponse('InternalServerError')
    }
  }
}
