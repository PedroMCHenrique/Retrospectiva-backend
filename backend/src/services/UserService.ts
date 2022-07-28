import { IUserService, ILoginValidator, IUser } from "../interfaces";
import UserModel from '../database/models/UserModel';
import HandleError from "../helpers/HandleError";

class UserService implements IUserService {
  constructor(private loginValidator: ILoginValidator) {
    this.loginValidator = loginValidator;
  }

  async login({ email, password }: Pick<IUser, 'email' | 'password'>): Promise<Omit<IUser, "password">> {
    this.loginValidator.valid({ email, password });

    const user = await UserModel.findOne({ where: { email, password }, attributes: { exclude: ['password'] } });

    if (!user) {
      throw HandleError.badRequest('incorrect "email" or "password"');
    }
    
    return user;
  }
}

export default UserService;