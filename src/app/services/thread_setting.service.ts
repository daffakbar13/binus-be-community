import { ThreadSettingRepository } from 'app/repositories/thread_setting.repository'
import { Constant } from 'common/constants'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { sortRequest } from 'utils/helpers/sort'
import { LoggingService } from './logging.service'

export namespace ThreadSettingService {
  export async function GetListThreadSetting(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const { query } = req
        const order = sortRequest(query)
        const result = await ThreadSettingRepository.GetListThreadSetting({
          order,
          where: {
            ...(query.tenant_uuid && { tenant_uuid: query.tenant_uuid }),
          },
        })
        return baseResponse('Ok', [...result])
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateThreadSetting(req: Request) {
    try {
      const [, [result]] = await ThreadSettingRepository.UpdateThreadSetting(
        Number(req.params.id),
        {
          ...req.body,
        },
      )
      return baseResponse('Ok', result)
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }
}
