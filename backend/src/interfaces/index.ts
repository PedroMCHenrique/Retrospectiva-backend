export interface IUser {
  id?: number;
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

export interface IUserService {
  login({ email, password }: Partial<Pick<IUser, 'email' | 'password'>>): Promise<Omit<IUser, 'password'>>
};

export interface ITokenGenerator {
  generate({ name, email }: Pick<IUser, 'name' | 'email'>): string;
}

export interface ILoginModel {
  findOneByEmail(email: IUser['email']): Promise<IUser>;
}

export interface ILoginValidator {
  valid({ email, password }: Partial<Pick<IUser, 'email' | 'password'>>): void;
}