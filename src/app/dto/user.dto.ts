export namespace UserDto {
  interface UserRole {
    user_role_id: string
    role_id: string
    name: string
  }

  export interface User {
    id: number
    binusian_id: number | null
    student_id?: number
    username: string
    role_name: string
    apple_id: number | null
    name: string
    customer_id: string
    created_at: string
    updated_at: string
    tenant_uuid: string
    photo_url: string
    roles: UserRole[]
  }
}

declare module 'express-session' {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    user: UserDto.User
  }
}
