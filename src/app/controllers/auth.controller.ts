import { AuthDto } from 'app/dto/auth.dto'
import { AuthService } from 'app/services/auth.service'
import { Request, Response } from 'express'
import { sendResponse } from 'utils/common/dto/sendResponse.dto'

export namespace AuthController {
  export async function Login(req: Request<{}, {}, AuthDto.LoginType>, res: Response) {
    const result = await AuthService.Login(req.body)
    return sendResponse(res, result)
  }
}
