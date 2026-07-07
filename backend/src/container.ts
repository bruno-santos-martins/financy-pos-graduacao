import { LoginUseCase } from './application/use-cases/auth/LoginUseCase.js';
import { RegisterUseCase } from './application/use-cases/auth/RegisterUseCase.js';
import { CreateTransactionUseCase } from './application/use-cases/transaction/CreateTransactionUseCase.js';
import { GetTransactionsUseCase } from './application/use-cases/transaction/GetTransactionsUseCase.js';
import { DeleteTransactionUseCase } from './application/use-cases/transaction/DeleteTransactionUseCase.js';
import { GetDashboardSummaryUseCase } from './application/use-cases/transaction/GetDashboardSummaryUseCase.js';
import { CreateCategoryUseCase } from './application/use-cases/category/CreateCategoryUseCase.js';
import { GetCategoriesUseCase } from './application/use-cases/category/GetCategoriesUseCase.js';
import { UpdateCategoryUseCase } from './application/use-cases/category/UpdateCategoryUseCase.js';
import { DeleteCategoryUseCase } from './application/use-cases/category/DeleteCategoryUseCase.js';
import { PrismaTransactionRepository } from './infrastructure/database/prisma/repositories/PrismaTransactionRepository.js';
import { PrismaUserRepository } from './infrastructure/database/prisma/repositories/PrismaUserRepository.js';
import { PrismaCategoryRepository } from './infrastructure/database/prisma/repositories/PrismaCategoryRepository.js';
import { BcryptHashService } from './infrastructure/services/BcryptHashService.js';
import { JwtTokenService } from './infrastructure/services/JwtTokenService.js';

export type AppContainer = {
  userRepository: PrismaUserRepository;
  transactionRepository: PrismaTransactionRepository;
  categoryRepository: PrismaCategoryRepository;
  hashService: BcryptHashService;
  tokenService: JwtTokenService;
  loginUseCase: LoginUseCase;
  registerUseCase: RegisterUseCase;
  createTransactionUseCase: CreateTransactionUseCase;
  getTransactionsUseCase: GetTransactionsUseCase;
  deleteTransactionUseCase: DeleteTransactionUseCase;
  getDashboardSummaryUseCase: GetDashboardSummaryUseCase;
  createCategoryUseCase: CreateCategoryUseCase;
  getCategoriesUseCase: GetCategoriesUseCase;
  updateCategoryUseCase: UpdateCategoryUseCase;
  deleteCategoryUseCase: DeleteCategoryUseCase;
};

export function buildContainer(input: { jwtSecret: string }): AppContainer {
  const userRepository = new PrismaUserRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const categoryRepository = new PrismaCategoryRepository();
  const hashService = new BcryptHashService();
  const tokenService = new JwtTokenService(input.jwtSecret);

  const loginUseCase = new LoginUseCase(userRepository, hashService, tokenService);
  const registerUseCase = new RegisterUseCase(userRepository, hashService);
  const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
  const getTransactionsUseCase = new GetTransactionsUseCase(transactionRepository);
  const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);
  const getDashboardSummaryUseCase = new GetDashboardSummaryUseCase(transactionRepository);
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

  return {
    userRepository,
    transactionRepository,
    categoryRepository,
    hashService,
    tokenService,
    loginUseCase,
    registerUseCase,
    createTransactionUseCase,
    getTransactionsUseCase,
    deleteTransactionUseCase,
    getDashboardSummaryUseCase,
    createCategoryUseCase,
    getCategoriesUseCase,
    updateCategoryUseCase,
    deleteCategoryUseCase,
  };
}
