import { AuthDto } from 'app/dto/auth.dto'
import { AuthService } from 'app/services/auth.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace AuthController {
  export async function SSOCheck(req: Request<{}, {}, AuthDto.LoginType>, res: Response) {
    const result = AuthService.SSOCheck(req.session)

    return sendResponse(res, result)
  }

  export async function Login(req: Request<{}, {}, AuthDto.LoginType>, res: Response) {
    const result = await AuthService.Login(req.body, req.session)
    return sendResponse(res, result)
  }
}
