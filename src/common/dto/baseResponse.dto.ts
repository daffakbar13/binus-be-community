import axios from 'axios'

type Data = string | object | null

export function baseResponse<T extends Data = null>(
  httpStatus: keyof typeof axios.HttpStatusCode,
  data?: T,
) {
  return {
    data: data || null,
    status: axios.HttpStatusCode[httpStatus],
    message: httpStatus,
  }
}

export type BaseResponse<T extends Data = null> = ReturnType<typeof baseResponse<T>>

export type BaseResponseSokrates<T extends Data = null> = {
  status: boolean
  version: string
  message: string
  data: T
  meta: any
}

export type BaseResponseTenant<T extends Data = null> = {
  error: number
  message: string
  result: T
}
