import { z } from 'zod';
import { UnauthorizedError } from '../../../domain/errors/UnauthorizedError.js';
import { IUserRepository } from '../../ports/repositories/IUserRepository.js';
import { IHashService } from '../../ports/services/IHashService.js';
import { ITokenService } from '../../ports/services/ITokenService.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginInput = z.infer<typeof loginSchema>;

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: LoginInput) {
    const data = loginSchema.parse(input);
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    const isPasswordValid = await this.hashService.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    const token = this.tokenService.sign({ sub: user.id, email: user.email });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
