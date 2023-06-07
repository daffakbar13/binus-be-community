import { AuthService } from 'app/services/auth.service'
import { Request, Response } from 'express'

export namespace AuthController {
  export async function login(req: Request, res: Response) {
    const result = await AuthService.login(req.body)
    res.status(result.status).send(result)
  }
}
