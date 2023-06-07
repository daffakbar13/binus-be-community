import axios from 'axios'

export function baseResponse<T extends string | object | null = null>(
  httpStatus: keyof typeof axios.HttpStatusCode,
  data?: T,
) {
  return {
    data: data || null,
    status: axios.HttpStatusCode[httpStatus],
    message: httpStatus,
  }
}
