import { IUser, IUserValidator } from "../interfaces";
import Joi from 'joi';
import HandleError from "../helpers/HandleError";

class UserValidator implements IUserValidator {
  valid({ name, email, password }: Omit<IUser, 'id'>) {
    const validBody = Joi.object({
      name: Joi.string().min(2).max(30).required(), // min 2 por conta de padroes de nomes asiaticos como Wu ou Li
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required(),
    });

    const { error } = validBody.validate({ name, email, password });
    
    if (error) {
      throw HandleError.badRequest(error.message);
    }
  }
}

export default UserValidator;