import { TenantDto } from 'app/dto/tenant.dto'
import axios from 'axios'
import { BaseResponseTenant, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'
import { Constant } from 'common/constants'
import { LoggingService } from './logging.service'

export namespace TenantService {
  const instance = () => {
    const axiosInstance = axios.create({ baseURL: `${getEnv('API_SYSTEM_SOKRATES')}/system` })
    axiosInstance.interceptors.response.use((res) => res.data)
    return axiosInstance
  }
  const authService = instance()

  export async function TenantList(req: Request) {
    try {
      const result = await authService.get<null, BaseResponseTenant<TenantDto.Tenant[]>>(
        '/customers',
        {
          headers: { Authorization: req.headers.authorization },
        },
      )
      return result
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_SOKRATES_SYSTEM_SERVICE, err)
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMappedTenant(req: Request, data: any) {
    try {
      // Get Tenant List
      const tenants: any = await TenantList(req)
      const tenant = tenants.result.data

      const isArray = Array.isArray(data)

      let result: any = []

      if (isArray) {
        data.forEach((item: any) => {
          const tenantFilter = tenant.find((a: any) => a.tenant_uuid === item.user.tenant_uuid)
          result.push({ ...item, tenant: tenantFilter })
        })
      } else {
        const filter = tenant.find((a: any) => a.tenant_uuid === data.user.tenant_uuid)
        const assign: any = []
        data.tenants.forEach((item: any) => {
          const filterTenant = tenant.find((a: any) => a.tenant_uuid === item.tenant_uuid)
          assign.push(filterTenant)
        })
        result = { ...data, tenant: filter, assignTenant: assign }
      }

      return baseResponse('Ok', result)
    } catch (err) {
      LoggingService.Error(req, Constant.ERR_SOKRATES_SYSTEM_SERVICE, err)
      return baseResponse('InternalServerError')
    }
  }
}
