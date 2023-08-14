import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { BannerRepository } from 'app/repositories/banner.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { getEnv } from 'configs/env'
import { s3 } from 'configs/aws'
import moment from 'moment'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { Constant } from 'common/constants'
import { format } from 'util'
import { BannerTenantService } from './banner_tenant.service'
import { NotificationService } from './notification.service'

export namespace BannerService {
  export async function GetBannerList(req: Request) {
    try {
      const { query } = req
      const pagination = paginationObject(query)
      const result = await BannerRepository.GetBannerList(
        {
          ...pagination,
          where: {
            ...(query.is_active && { is_active: query.is_active }),
          },
        },
        {
          ...(query.tenant_uuid && { tenant_uuid: query.tenant_uuid as string }),
        },
      )
      return baseResponse('Ok', responseWithPagination({ ...result, ...pagination }))
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetBannerDetail(req: Request) {
    try {
      const result = await BannerRepository.GetBannerDetail({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateBanner(req: Request) {
    try {
      const { user } = req.session
      const file = req.file as any
      const { tenant_uuids } = req.body
      if (user) {
        if (file) {
          const result = await BannerRepository.CreateBanner({
            ...req.body,
            user_id: user.id,
            is_active: moment().isAfter(req.body.start_date),
            image_url: file.location,
            image_key: file.key,
          })
          const tenants = await BannerTenantService.CreateBannerTenant(result.id, tenant_uuids)
          await NotificationService.CreateNotification(req, {
            recipient_type: 'specific-user',
            type_id: NotificationService.NotificationTypes.BANNERCOMMUNITY,
            title: Constant.NOTIFICATION_TITLE_NEW_BANNER,
            body: format(Constant.NOTIFICATION_BODY_NEW_BANNER, result.title),
            tenant_uuids: tenants.map((t) => t.tenant_uuid),
            data: { id: String(result.id) },
          })
          return baseResponse('Ok', result)
        }
        return baseResponse('BadRequest')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateBanner(req: Request) {
    try {
      const { user } = req.session
      const file = req.file as any
      const id = Number(req.params.id)
      if (user) {
        if (file) {
          await DeleteImageFromAWS(id)
        }
        const [, [result]] = await BannerRepository.UpdateBanner(id, {
          ...req.body,
          user_id: user.id,
          ...(file && {
            image_url: file.location,
            image_key: file.key,
          }),
        })
        return baseResponse('Ok', result)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteBanner(req: Request) {
    try {
      const id = Number(req.params.id)
      await DeleteImageFromAWS(id)
      await BannerRepository.DeleteBanner({ id })
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteImageFromAWS(id: number) {
    const oldData = await BannerRepository.GetBannerDetail({ id })
    if (oldData) {
      const deleteCmd = new DeleteObjectCommand({
        Bucket: getEnv('BUCKET_NAME'),
        Key: oldData.image_key,
      })
      await s3.send(deleteCmd)
    }
  }
}
