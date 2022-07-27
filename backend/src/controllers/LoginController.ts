import { NextFunction, Request, Response } from "express";
import { ILoginService, ITokenGenerator } from "../interfaces";

class LoginController {
  constructor(private loginService: ILoginService, private tokenGenerator: ITokenGenerator) {
    this.loginService = loginService 
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = await this.loginService.login({ email: body.email, password: body.password });

      const token = this.tokenGenerator.generate(user);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;