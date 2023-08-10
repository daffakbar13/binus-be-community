import { TenantDto } from 'app/dto/tenant.dto'
import axios from 'axios'
import { BaseResponseTenant, baseResponse } from 'common/dto/baseResponse.dto'
import { getEnv } from 'configs/env'
import { Request } from 'express'

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
      return baseResponse('InternalServerError')
    }
  }

  export async function GetMappedTenant(
    req: Request,
    data: any,
  ) {
    try {
      // Get Tenant List
      const tenants: any = await TenantList(req)
      const tenant = tenants.result.data

      const result: any = []

      data.forEach((item: any) => {
        const tenantFilter = tenant.find((a: any) => a.tenant_uuid === item.user.tenant_uuid)
        result.push({ ...item, tenant: tenantFilter })
      })

      return baseResponse('Ok', result)
    } catch (err) {
      return baseResponse('InternalServerError')
    }
  }
}
