import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestUser, TokenPayload } from '../interfaces';

class Jwt {
  validate = (req: RequestUser, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(400).json({ message: 'Token must be a valid token' });
      const secret = process.env.JWT_SECRET || 'secret_key';
      const decoded = jwt.verify(authorization, secret);      
      req.user = decoded as TokenPayload;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default Jwt;