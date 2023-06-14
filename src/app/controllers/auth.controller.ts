import { AuthDto } from 'app/dto/auth.dto'
import { AuthService } from 'app/services/auth.service'
import { sendResponse } from 'common/dto/sendResponse.dto'
import { Request, Response } from 'express'

export namespace AuthController {
  export async function SSOCheck(req: Request<{}, {}, AuthDto.LoginType>, res: Response) {
    const result = AuthService.SSOCheck(req.ip)
    // const {
    //   ip,
    //   socket: { localAddress, remoteAddress },
    // } = req
    // console.log({ ip, localAddress, remoteAddress })

    return sendResponse(res, result)
  }

  export async function Login(req: Request<{}, {}, AuthDto.LoginType>, res: Response) {
    const result = await AuthService.Login(req.ip, req.body)
    return sendResponse(res, result)
  }
}
