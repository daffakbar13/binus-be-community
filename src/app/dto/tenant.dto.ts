export namespace TenantDto {

  export interface Tenant {
    id: number
    name: string
    email: string
    tenant_uuid: string
    logo: string
  }
}

declare module 'express-session' {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    tenant: TenantDto.Tenant
  }
}
