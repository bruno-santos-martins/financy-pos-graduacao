import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { PrismaTransactionRepository } from '../../../../src/infrastructure/database/prisma/repositories/PrismaTransactionRepository.js';
import { prisma } from '../../../../src/infrastructure/database/prisma/client.js';

describe('PrismaTransactionRepository', () => {
  let repository: PrismaTransactionRepository;
  let testUserId: string;

  beforeAll(async () => {
    repository = new PrismaTransactionRepository();

    const user = await prisma.user.create({
      data: {
        name: 'Test User Transaction',
        email: `test-tx-${Date.now()}@example.com`,
        passwordHash: 'hash',
      },
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({ where: { userId: testUserId } });
    await prisma.user.delete({ where: { id: testUserId } });
    await prisma.$disconnect();
  });

  it('deve criar uma transação no banco de dados', async () => {
    const tx = await repository.create({
      userId: testUserId,
      description: 'Test Transaction',
      amount: 100,
      type: 'EXPENSE',
      date: new Date('2025-01-01'),
    });

    expect(tx.id).toBeDefined();
    expect(tx.description).toBe('Test Transaction');
    expect(tx.userId).toBe(testUserId);
  });

  it('deve listar transações pelo userId', async () => {
    const txs = await repository.listByUserId(testUserId);
    expect(txs.length).toBeGreaterThan(0);
    expect(txs[0].userId).toBe(testUserId);
  });
});
