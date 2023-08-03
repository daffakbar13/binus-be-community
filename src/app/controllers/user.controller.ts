import { UserService } from 'app/services/user.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace UserController {
  export async function GetUserInfo(req: Request, res: Response) {
    const result = await UserService.GetUserInfo(req)
    return sendResponse(res, result)
  }
}
