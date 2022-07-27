import { ILoginValidator, IUser } from "../interfaces";
import Joi from 'joi';
import handleError from "../helpers/HandleError";

class LoginValidator implements ILoginValidator {
  valid({ email, password }: Partial<Pick<IUser, "email" | "password">>): void {
    const validBody = Joi.object(({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    }))

    const validResponse = validBody.validate({ email, password });

    if (validResponse.error) {
      throw handleError.badRequest(validResponse.error.message);
    }
  }
}

export default LoginValidator;