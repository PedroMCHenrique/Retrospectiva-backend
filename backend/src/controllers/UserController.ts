import { NextFunction, Request, Response } from "express";
import { IUserService, ITokenGenerator } from "../interfaces";

class UserController {
  constructor(private userService: IUserService, private tokenGenerator: ITokenGenerator) {
    this.userService = userService 
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = await this.userService.login({ email: body.email, password: body.password });

      const token = this.tokenGenerator.generate(user);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const USER_INFO_SCHEMA = {
        name: body.name,
        email: body.email,
        password: body.password,
      };
      const newUser = await this.userService.register(USER_INFO_SCHEMA);
      const token = this.tokenGenerator.generate(newUser);
      return res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;