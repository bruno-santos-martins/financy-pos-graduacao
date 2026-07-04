import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from '../../../application/use-cases/auth/RegisterUseCase.js';
import { FakeUserRepository } from '../../fakes/repositories/FakeUserRepository.js';
import { FakeHashService } from '../../fakes/services/FakeHashService.js';

describe('RegisterUseCase', () => {
  it('deve criar usuário', async () => {
    const userRepository = new FakeUserRepository();
    const hashService = new FakeHashService();
    const useCase = new RegisterUseCase(userRepository, hashService);

    const result = await useCase.execute({
      name: 'Usuário',
      email: 'usuario@usuario.com',
      password: '123456',
    });

    expect(result.email).toBe('usuario@usuario.com');
  });
});
