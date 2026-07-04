import { User } from '../../../../domain/entities/User.js';
import { CreateUserInput, IUserRepository } from '../../../../application/ports/repositories/IUserRepository.js';
import { prisma } from '../client.js';

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    return new User(user.id, user.name, user.email, user.passwordHash, user.createdAt);
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }

    return new User(user.id, user.name, user.email, user.passwordHash, user.createdAt);
  }

  async create(input: CreateUserInput) {
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
      },
    });

    return new User(user.id, user.name, user.email, user.passwordHash, user.createdAt);
  }
}
