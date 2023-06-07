import { UserRepository } from 'app/repositories/user.repository'

export namespace UserService {
  export async function getUserByEmail(email: string) {
    const result = await UserRepository.getUserByEmail(email)
    return result
  }

  export async function getUserByBinusianId(binusian_id: string) {
    const result = await UserRepository.getUserByBinusianId(binusian_id)
    return result
  }
}
