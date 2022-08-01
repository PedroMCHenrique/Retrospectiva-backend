import jwt from 'jsonwebtoken';
import { ITokenGenerator, IUser } from '../interfaces';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

class TokenGenerator implements ITokenGenerator{
  generate({ id, name, email }: Pick<IUser, 'id' | 'name' | 'email'>): string {
    const token = jwt.sign({ id, name, email }, JWT_SECRET)

    return token;
  }
}

export default TokenGenerator;