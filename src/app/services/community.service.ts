import { CommunityRepository } from 'app/repositories/community.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Communities } from 'app/models/communities'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { searchRequest } from 'utils/helpers/search'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getEnv } from 'configs/env'
import { s3 } from 'configs/aws'
import { Constant } from 'common/constants'
import { format } from 'util'
import { NotificationService } from './notification.service'
import { LoggingService } from './logging.service'

export namespace CommunityService {
  export async function GetCommunityList(req: Request) {
    try {
      const { query } = req
      const { user } = req.session
      if (user) {
        const pagination = paginationObject(query)
        const search = searchRequest<Communities>(['name'], query.search as string)
        const result = await CommunityRepository.GetListCommunity(user.id, {
          ...pagination,
          where: {
            ...search,
            ...(query.tenant_uuid && { tenant_uuid: query.tenant_uuid }),
            ...(query.is_active && { is_active: query.is_active }),
            ...(query.is_member_type && user.role_name === 'TEACHER' && { is_teacher: true }),
            ...(query.is_member_type && user.role_name === 'STUDENT' && { is_student: true }),
            ...(query.is_member_type && user.role_name === 'PARENT' && { is_parent: true }),
          },
        })
        return baseResponse('Ok', responseWithPagination({ ...result, ...pagination }))
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function GetCommunityDetail(req: Request) {
    try {
      const { id } = req.params
      const { user } = req.session
      if (user) {
        const result = await CommunityRepository.GetDetailCommunity(user.id, { id })
        return baseResponse('Ok', result)
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateCommunity(req: Request) {
    try {
      const { user } = req.session
      const file = req.file as any
      if (user) {
        if (file) {
          const result = await CommunityRepository.CreateCommunity({
            ...req.body,
            user_id: user.id,
            image_url: file.location,
            image_key: file.key,
          })
          await NotificationService.CreateNotification(req, {
            recipient_type: 'specific-user',
            title: Constant.NOTIFICATION_TITLE_NEW_COMMUNITY,
            body: format(Constant.NOTIFICATION_BODY_NEW_COMMUNITY, result.name),
            type_id: NotificationService.NotificationTypes.COMMUNITY,
            tenant_uuids: [result.tenant_uuid],
            data: { id: String(result.id) },
          })
          return baseResponse('Ok', result)
        }
        LoggingService.Error(req, Constant.ERR_INTERNAL, Constant.ERR_FILE_NOT_EXISTS)
        return baseResponse('BadRequest')
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateCommunity(req: Request) {
    try {
      const { user } = req.session
      const file = req.file as any
      if (user) {
        if (file) {
          await DeleteImageFromAWS(req, user.id, Number(req.params.id))
        }
        const [, [result]] = await CommunityRepository.UpdateCommunity(Number(req.params.id), {
          ...req.body,
          user_id: user.id,
          ...(file && {
            image_url: file.location,
            image_key: file.key,
          }),
        })
        return baseResponse('Ok', result)
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteCommunity(req: Request) {
    try {
      const { id } = req.params
      const { user } = req.session
      if (user) {
        await CommunityRepository.DeleteCommunity({ id })
        await DeleteImageFromAWS(req, user.id, Number(id))
        return baseResponse('Ok')
      }
      LoggingService.Error(req, Constant.ERR_AUTH_SERVICE, Constant.ERR_SESSION_USER_NOT_FOUND)
      return baseResponse('Unauthorized')
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_INTERNAL, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteImageFromAWS(req: Request, user_id: number, id: number) {
    try {
      const oldData = await CommunityRepository.GetDetailCommunity(user_id, { id })
      if (oldData) {
        const deleteCmd = new DeleteObjectCommand({
          Bucket: getEnv('BUCKET_NAME'),
          Key: oldData.image_key,
        })
        await s3.send(deleteCmd)
      }
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_AWS, err)
    }
  }
}
