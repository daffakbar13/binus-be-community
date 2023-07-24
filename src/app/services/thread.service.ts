import { ThreadRepository } from 'app/repositories/thread.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Threads } from 'app/models/threads'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { searchRequest } from 'utils/helpers/search'
import { sortRequest } from 'utils/helpers/sort'
import { UserService } from './user.service'
import { ThreadTenantService } from './thread_tenant.service'

export namespace ThreadService {
  export async function GetListThread(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const { query } = req
        const pagination = paginationObject(query)
        const sort = sortRequest(query)
        const search = searchRequest<Threads>(['tags', 'title'], query.search as string)
        const result = await ThreadRepository.GetListThread(user.data.id, {
          ...pagination,
          ...sort,
          where: {
            ...search,
            ...(query.is_active && { is_active: query.is_active }),
            ...(query.is_pinned && { is_pinned: query.is_pinned }),
            ...(query.is_my_thread && { user_id: user.data.id }),
            ...(query.status_id && { status_id: query.status_id }),
            ...(query.sub_community_id && { sub_community_id: query.sub_community_id }),
          },
        })
        return baseResponse('Ok', responseWithPagination({ ...result, ...pagination }))
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMyThreads(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const data = await ThreadRepository.GetMyThreads({ user_id: user.data.id })
        return baseResponse('Ok', data)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailThread(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        if (req.query.increase_view === 'true') {
          await ThreadRepository.IncrementThreadView({ id: req.params.id })
        }
        const result = await ThreadRepository.GetDetailThread(user.data.id, { id: req.params.id })
        return baseResponse('Ok', result)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateThread(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        const { tenant_ids } = req.body
        const result = await ThreadRepository.CreateThread({
          ...req.body,
          user_id: user.data.id,
          status_id: 1,
        })
        if (tenant_ids) {
          await ThreadTenantService.CreateThreadTenant(result.id, tenant_ids)
        }
        return baseResponse('Ok', result)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateThread(req: Request) {
    try {
      const user = await UserService.UserInfo(req)
      if (user.data) {
        await ThreadRepository.UpdateThread(Number(req.params.id), {
          ...req.body,
          user_id: user.data.id,
        })
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function ThreadApproval(req: Request) {
    try {
      const [, [result]] = await ThreadRepository.UpdateThread(Number(req.params.id), {
        ...req.body,
      })
      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function DeleteThread(req: Request) {
    try {
      const { id } = req.params
      await ThreadRepository.DeleteThread({ id })
      return baseResponse('Ok')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
