import { CreateUserInput, IUserRepository } from '../../../application/ports/repositories/IUserRepository.js';
import { User } from '../../../domain/entities/User.js';

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async create(input: CreateUserInput) {
    const user = new User(crypto.randomUUID(), input.name, input.email, input.passwordHash, new Date());
    this.users.push(user);
    return user;
  }
}
