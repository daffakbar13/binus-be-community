import { CommunityRepository } from 'app/repositories/community.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Communities } from 'app/models/communities'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { searchRequest } from 'utils/helpers/search'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getEnv } from 'configs/env'
import { s3 } from 'configs/aws'
import { UserService } from './user.service'

export namespace CommunityService {
  export async function GetListCommunity(req: Request) {
    try {
      const { query } = req
      const pagination = paginationObject(query)
      const search = searchRequest<Communities>(['name'], query.search as string)
      const result = await CommunityRepository.GetListCommunity(pagination, search)
      return baseResponse('Ok', responseWithPagination({ ...result, ...pagination }))
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailCommunity(req: Request) {
    try {
      const result = await CommunityRepository.GetDetailCommunity({ id: req.params.id })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateCommunity(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      const file = req.file as any
      if (user.data) {
        if (file) {
          const result = await CommunityRepository.CreateCommunity({
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

  export async function UpdateCommunity(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      const file = req.file as any
      if (user.data) {
        if (file) {
          await DeleteImageFromAWS(Number(req.params.id))
        }
        await CommunityRepository.UpdateCommunity(Number(req.params.id), {
          ...req.body,
          user_id: user.data.id,
          ...(file && {
            image_url: file.location,
            image_key: file.key,
          }),
        })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteCommunity(req: Request) {
    try {
      const { id } = req.params
      await CommunityRepository.DeleteCommunity({ id })
      await DeleteImageFromAWS(Number(id))
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteImageFromAWS(id: number) {
    const oldData = await CommunityRepository.GetDetailCommunity({ id })
    if (oldData) {
      const deleteCmd = new DeleteObjectCommand({
        Bucket: getEnv('BUCKET_NAME'),
        Key: oldData.image_key,
      })
      await s3.send(deleteCmd)
    }
  }
}
