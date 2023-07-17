import { SubCommunityRepository } from 'app/repositories/sub_community.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Communities } from 'app/models/communities'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { searchRequest } from 'utils/helpers/search'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getEnv } from 'configs/env'
import { s3 } from 'configs/aws'
import { SubCommunities } from 'app/models/sub_communities'
import { UserService } from './user.service'

export namespace SubCommunityService {
  export async function GetListSubCommunity(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const { query } = req
        const pagination = paginationObject(query)
        const search = searchRequest<Communities>(['name'], query.search as string)
        const { count, rows } = await SubCommunityRepository.GetListSubCommunity(pagination, search)
        return baseResponse(
          'Ok',
          responseWithPagination({
            count,
            rows: MappingSubCommunity(rows, user.data.id),
            ...pagination,
          }),
        )
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailSubCommunity(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const result = await SubCommunityRepository.GetDetailSubCommunity({ id: req.params.id })
        return baseResponse('Ok', SubCommunityMapCallback(result, user.data.id))
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
          await DeleteImageFromAWS(Number(req.params.id))
        }
        await SubCommunityRepository.UpdateSubCommunity(Number(req.params.id), {
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

  export async function DeleteSubCommunity(req: Request) {
    try {
      const { id } = req.params
      await SubCommunityRepository.DeleteSubCommunity({ id })
      await DeleteImageFromAWS(Number(id))
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteImageFromAWS(id: number) {
    const oldData = await SubCommunityRepository.GetDetailSubCommunity({ id })
    if (oldData) {
      const deleteCmd = new DeleteObjectCommand({
        Bucket: getEnv('BUCKET_NAME'),
        Key: oldData.image_key,
      })
      await s3.send(deleteCmd)
    }
  }

  export function MappingSubCommunity(data: SubCommunities[], id: number) {
    return data.map((e) => SubCommunityMapCallback(e, id))
  }

  export function SubCommunityMapCallback(data: SubCommunities | null, id: number) {
    if (data) {
      return {
        ...data.dataValues,
        total_members: data.members.length,
        is_my_sub_community: data.members.map((m) => m.user_id).includes(id),
      }
    }
    return null
  }
}
