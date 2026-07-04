import { z } from 'zod';
import { AppError } from '../../../domain/errors/AppError.js';
import { IUserRepository } from '../../ports/repositories/IUserRepository.js';
import { IHashService } from '../../ports/services/IHashService.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterInput = z.infer<typeof registerSchema>;

export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(input: RegisterInput) {
    const data = registerSchema.parse(input);
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('Email já cadastrado', 'EMAIL_ALREADY_EXISTS');
    }

    const passwordHash = await this.hashService.hash(data.password);
    const createdUser = await this.userRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }
}
