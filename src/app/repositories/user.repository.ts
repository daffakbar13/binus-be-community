import { UserEmails } from 'app/models/user_emails'
import { UserRoles } from 'app/models/user_roles'
import { Users } from 'app/models/users'

export namespace UserRepository {
  export function GetUserByEmail(email: string) {
    return Users.findOne({
      attributes: {
        exclude: ['id', 'user_role_id', 'password'],
      },
      include: [
        {
          model: UserEmails,
          as: 'emails',
          attributes: ['email'],
          where: { email },
        },
        {
          model: UserRoles,
          as: 'role',
          attributes: ['role'],
        },
      ],
    })
  }

  export function GetUserByBinusianId(binusian_id: string) {
    return Users.findOne({
      where: { binusian_id },
      include: [
        {
          model: UserEmails,
          as: 'emails',
          attributes: ['email'],
        },
        {
          model: UserRoles,
          as: 'role',
          attributes: ['role'],
        },
      ],
    })
  }
}
