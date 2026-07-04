import { User } from '../../../domain/entities/User.js';

export type CreateUserInput = {
  name: string;
  email: string;
  passwordHash: string;
};

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
}
