import { UserRepository } from 'app/repositories/user.repository'

export namespace UserService {
  export async function GetUserByEmail(email: string) {
    const result = await UserRepository.GetUserByEmail(email)
    return result
  }

  export async function GetUserByBinusianId(binusian_id: string) {
    const result = await UserRepository.GetUserByBinusianId(binusian_id)
    return result
  }
}
