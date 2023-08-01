import { ThreadRepository } from 'app/repositories/thread.repository'
import { baseResponse } from 'common/dto/baseResponse.dto'
import { Request } from 'express'
import { Threads } from 'app/models/threads'
import { paginationObject, responseWithPagination } from 'utils/helpers/pagination'
import { searchRequest } from 'utils/helpers/search'
import { sortRequest } from 'utils/helpers/sort'
import { MasterStatusRepository } from 'app/repositories/master_status.repository'
import { UserService } from './user.service'
import { ThreadTenantService } from './thread_tenant.service'

export namespace ThreadService {
  export async function GetListThread(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const { query } = req
        const pagination = paginationObject(query)
        const order = sortRequest(query)
        const search = searchRequest<Threads>(['tags', 'title'], query.search as string)
        const { count, rows } = await ThreadRepository.GetListThread(
          user.id,
          {
            ...pagination,
            order,
            where: {
              ...search,
              ...(query.is_active && { is_active: query.is_active }),
              ...(query.is_pinned && { is_pinned: query.is_pinned }),
              ...(query.is_my_thread && { user_id: user.id }),
              ...(query.status_id && { status_id: query.status_id }),
              ...(query.community_id && { community_id: query.community_id }),
              ...(query.sub_community_id && { sub_community_id: query.sub_community_id }),
            },
          },
          {
            ...(query.tenant_uuid && { tenant_uuid: query.tenant_uuid }),
          },
        )
        const result = await UserService.GetMappedUsers(req, rows)
        if (result.data) {
          return baseResponse(
            'Ok',
            responseWithPagination({ count, rows: result.data, ...pagination }),
          )
        }
        return result
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMyThreads(req: Request) {
    try {
      const { query } = req
      const { user } = req.session
      if (user) {
        const pagination = paginationObject(query)
        const result = await ThreadRepository.GetMyThreads({
          ...pagination,
          where: { user_id: user.id },
        })
        return baseResponse('Ok', responseWithPagination({ ...result, ...pagination }))
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function GetDetailThread(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        if (req.query.increase_view === 'true') {
          await ThreadRepository.IncrementThreadView({ id: req.params.id })
        }
        const thread = await ThreadRepository.GetDetailThread(user.id, { id: req.params.id })
        if (thread) {
          const result = await UserService.GetMappedUsers(req, thread)
          return result
        }
        return baseResponse('Ok')
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function CreateThread(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const { tenant_uuids } = req.body
        const result = await ThreadRepository.CreateThread({
          ...req.body,
          user_id: user.id,
          status_id: 1,
          ...(!['STUDENT', 'PARENT', 'TEACHER'].includes(user.role_name) && { is_pinned: true }),
        })
        if (tenant_uuids) {
          await ThreadTenantService.CreateThreadTenant(result.id, tenant_uuids)
        }
        return baseResponse('Ok', { ...result.dataValues, user })
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function UpdateThread(req: Request) {
    try {
      const { user } = req.session
      if (user) {
        const [isUpdated, [result]] = await ThreadRepository.UpdateThread(Number(req.params.id), {
          ...req.body,
          user_id: user.id,
        })
        return baseResponse('Ok', isUpdated ? { ...result.dataValues, user } : null)
      }
      return baseResponse('Unauthorized')
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }

  export async function ThreadApproval(req: Request) {
    try {
      const { status_id } = req.body
      const status = await MasterStatusRepository.GetMasterStatusDetail({ id: status_id })
      if (status) {
        const [, [result]] = await ThreadRepository.UpdateThread(Number(req.params.id), {
          ...req.body,
        })
        return baseResponse('Ok', result)
      }
      return baseResponse('BadRequest')
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
