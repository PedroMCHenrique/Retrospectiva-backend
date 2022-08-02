import { Request } from 'express';

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
}

export interface ICableway {
  id: number;
  price: number;
  seats: number;
  departureTime: string;
  image: string;
}

export type BuyTicket = {
  cablewayId: number;
  userId: number;
  quantity: number;
}

export type TokenPayload = {
  id: number;
  name: string;
  email: string;
}

export interface RequestUser extends Request {
  user?: TokenPayload;
}

export interface IUserService {
  login({ email, password }: Partial<Pick<IUser, 'email' | 'password'>>): Promise<Omit<IUser, 'password'>>;
  register({ name, email, password }: Partial<Omit<IUser, 'id'>>): Promise<Omit<IUser, 'password'>>;
};

export type TicketMessage = {
  message: string;
}

export interface ITicketService {
  buy(ticketInfo: BuyTicket): Promise<TicketMessage>;
}

export interface ITokenGenerator {
  generate({ name, email }: Pick<IUser, 'name' | 'email'>): string;
}

export interface ILoginModel {
  findOneByEmail(email: IUser['email']): Promise<IUser>;
}

export interface ILoginValidator {
  valid({ email, password }: Partial<Pick<IUser, 'email' | 'password'>>): void;
}

export interface IUserValidator {
  valid({ email, password }: Omit<IUser, 'id'>): void;
}