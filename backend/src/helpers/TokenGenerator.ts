import jwt from 'jsonwebtoken';
import { ITokenGenerator, IUser } from '../interfaces';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

class TokenGenerator implements ITokenGenerator{
  generate({ name, email }: Pick<IUser, 'name' | 'email'>): string {
    const token = jwt.sign({ name, email }, JWT_SECRET)

    return token;
  }
}

export default TokenGenerator;