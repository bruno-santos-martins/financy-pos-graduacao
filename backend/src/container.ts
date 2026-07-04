import { LoginUseCase } from './application/use-cases/auth/LoginUseCase.js';
import { RegisterUseCase } from './application/use-cases/auth/RegisterUseCase.js';
import { CreateTransactionUseCase } from './application/use-cases/transaction/CreateTransactionUseCase.js';
import { DeleteTransactionUseCase } from './application/use-cases/transaction/DeleteTransactionUseCase.js';
import { GetDashboardSummaryUseCase } from './application/use-cases/transaction/GetDashboardSummaryUseCase.js';
import { PrismaTransactionRepository } from './infrastructure/database/prisma/repositories/PrismaTransactionRepository.js';
import { PrismaUserRepository } from './infrastructure/database/prisma/repositories/PrismaUserRepository.js';
import { BcryptHashService } from './infrastructure/services/BcryptHashService.js';
import { JwtTokenService } from './infrastructure/services/JwtTokenService.js';

type BuildContainerInput = {
  jwtSecret: string;
};

export type AppContainer = ReturnType<typeof buildContainer>;

export function buildContainer(input: BuildContainerInput) {
  const userRepository = new PrismaUserRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const hashService = new BcryptHashService();
  const tokenService = new JwtTokenService(input.jwtSecret);

  const loginUseCase = new LoginUseCase(userRepository, hashService, tokenService);
  const registerUseCase = new RegisterUseCase(userRepository, hashService);
  const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
  const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);
  const getDashboardSummaryUseCase = new GetDashboardSummaryUseCase(transactionRepository);

  return {
    userRepository,
    transactionRepository,
    hashService,
    tokenService,
    loginUseCase,
    registerUseCase,
    createTransactionUseCase,
    deleteTransactionUseCase,
    getDashboardSummaryUseCase,
  };
}
