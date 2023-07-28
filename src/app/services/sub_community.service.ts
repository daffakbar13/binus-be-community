import { SubCommunityRepository } from 'app/repositories/sub_community.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Communities } from 'app/models/communities'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { searchRequest } from 'utils/helpers/search'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getEnv } from 'configs/env'
import { s3 } from 'configs/aws'
import { UserService } from './user.service'

export namespace SubCommunityService {
  export async function GetListSubCommunity(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const { query } = req
        const pagination = paginationObject(query)
        const search = searchRequest<Communities>(['name'], query.search as string)
        const result = await SubCommunityRepository.GetListSubCommunity(
          user.data.id,
          {
            ...pagination,
            where: {
              ...search,
              ...(query.is_active && { is_active: query.is_active }),
              ...(query.community_id && { community_id: query.community_id }),
            },
          },
          {
            ...(query.tenant_uuid && { tenant_uuid: Number(query.tenant_uuid) }),
          },
        )
        return baseResponse('Ok', responseWithPagination({ ...result, ...pagination }))
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailSubCommunity(req: Request) {
    try {
      const { id } = req.params
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const result = await SubCommunityRepository.GetDetailSubCommunity(user.data.id, { id })
        return baseResponse('Ok', result)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateSubCommunity(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      const file = req.file as any
      if (user.data) {
        if (file) {
          const result = await SubCommunityRepository.CreateSubCommunity({
            ...req.body,
            user_id: user.data.id,
            image_url: file.location,
            image_key: file.key,
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

  export async function UpdateSubCommunity(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      const file = req.file as any
      if (user.data) {
        if (file) {
          await DeleteImageFromAWS(user.data.id, Number(req.params.id))
        }
        const [, [result]] = await SubCommunityRepository.UpdateSubCommunity(
          Number(req.params.id),
          {
            ...req.body,
            user_id: user.data.id,
            ...(file && {
              image_url: file.location,
              image_key: file.key,
            }),
          },
        )
        return baseResponse('Ok', result)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteSubCommunity(req: Request) {
    try {
      const { id } = req.params
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await SubCommunityRepository.DeleteSubCommunity({ id })
        await DeleteImageFromAWS(user.data.id, Number(id))
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteImageFromAWS(user_id: number, id: number) {
    const oldData = await SubCommunityRepository.GetDetailSubCommunity(user_id, { id })
    if (oldData) {
      const deleteCmd = new DeleteObjectCommand({
        Bucket: getEnv('BUCKET_NAME'),
        Key: oldData.image_key,
      })
      await s3.send(deleteCmd)
    }
  }
}
