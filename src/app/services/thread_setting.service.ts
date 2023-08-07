import { ThreadSettingRepository } from 'app/repositories/thread_setting.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { sortRequest } from 'utils/helpers/sort'

export namespace ThreadSettingService {
  export async function GetListThreadSetting(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const { query } = req
        const order = sortRequest(query)
        const result = await ThreadSettingRepository.GetListThreadSetting(
          {
            order,
            where: {
              ...(query.tenant_uuid && { tenant_uuid: query.tenant_uuid }),
            },
          },
        )
        return baseResponse('Ok', [...result])
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateThreadSetting(req: Request) {
    try {
      const [, [result]] = await ThreadSettingRepository.UpdateThreadSetting(
        Number(req.params.id), {
          ...req.body,
        })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
