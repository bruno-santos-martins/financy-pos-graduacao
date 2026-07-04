import { describe, expect, it } from 'vitest';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase.js';
import { FakeUserRepository } from '../../fakes/repositories/FakeUserRepository.js';
import { FakeHashService } from '../../fakes/services/FakeHashService.js';
import { FakeTokenService } from '../../fakes/services/FakeTokenService.js';

describe('LoginUseCase', () => {
  it('deve autenticar com credenciais válidas', async () => {
    const userRepository = new FakeUserRepository();
    const hashService = new FakeHashService();
    const tokenService = new FakeTokenService();
    const useCase = new LoginUseCase(userRepository, hashService, tokenService);

    const passwordHash = await hashService.hash('123456');
    await userRepository.create({
      name: 'Usuário',
      email: 'usuario@usuario.com',
      passwordHash,
    });

    const result = await useCase.execute({
      email: 'usuario@usuario.com',
      password: '123456',
    });

    expect(result.token).toContain('token:');
    expect(result.user.email).toBe('usuario@usuario.com');
  });
});
