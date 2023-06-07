import { AuthDto } from 'app/dto/auth.dto'
import { AuthService } from 'app/services/auth.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace AuthController {
  export async function Login(req: Request<{}, {}, AuthDto.LoginType>, res: Response) {
    const result = await AuthService.Login(req.body)
    return sendResponse(res, result)
  }
}
