import { IUserService, ILoginValidator, IUser, IUserValidator } from "../interfaces";
import UserModel from '../database/models/UserModel';
import HandleError from "../helpers/HandleError";

class UserService implements IUserService {
  constructor(private loginValidator: ILoginValidator, private userValidator: IUserValidator) {
    this.loginValidator = loginValidator;
    this.userValidator = userValidator;
  }

  async login({ email, password }: Pick<IUser, 'email' | 'password'>): Promise<Omit<IUser, "password">> {
    this.loginValidator.valid({ email, password });

    const user = await UserModel.findOne({ where: { email, password }, attributes: { exclude: ['password'] } });

    if (!user) {
      throw HandleError.badRequest('incorrect "email" or "password"');
    }
    
    return user;
  }
  async register({ name, email, password }: Omit<IUser, 'id'>): Promise<Omit<IUser, "password" | any>> {
    this.userValidator.valid({ name, email, password});
    const findUser = await UserModel.findOne({ where: { email } });
    if(findUser) {
      throw HandleError.badRequest('"email" already used');
    }
    const newUser = await UserModel.create({ name, email, password });
    return newUser;
  }
}

export default UserService;