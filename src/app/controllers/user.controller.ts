import { AuthDto } from 'app/dto/auth.dto'
import { UserService } from 'app/services/user.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace UserController {
  export async function UserInfo(req: Request<{}, {}, AuthDto.LoginType>, res: Response) {
    const result = await UserService.UserInfo(req.headers.authorization as string)
    return sendResponse(res, result)
  }
}
