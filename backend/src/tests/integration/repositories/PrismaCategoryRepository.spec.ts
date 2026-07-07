import { describe, expect, it, beforeAll, afterEach } from 'vitest';
import { PrismaCategoryRepository } from '../../../infrastructure/database/prisma/repositories/PrismaCategoryRepository.js';
import { prisma } from '../../../infrastructure/database/prisma/client.js';

describe('PrismaCategoryRepository (Integration)', () => {
  const repository = new PrismaCategoryRepository();

  // Create a user to attach categories to
  let userId: string;

  beforeAll(async () => {
    // Ensure the database is connected
    await prisma.$connect();
    
    // Create a dummy user for foreign key constraints
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        passwordHash: 'hash',
      },
    });
    userId = user.id;
  });

  afterEach(async () => {
    // Clean up categories after each test
    await prisma.category.deleteMany({
      where: { userId }
    });
  });

  it('should create a category in the database', async () => {
    const category = await repository.create({
      userId,
      name: 'Integração',
      description: 'Teste DB',
      icon: 'Home',
      colorClass: '#000000',
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Integração');

    // Verify it actually saved to db
    const saved = await prisma.category.findUnique({ where: { id: category.id } });
    expect(saved).toBeTruthy();
    expect(saved?.name).toBe('Integração');
  });

  it('should find categories by user id', async () => {
    await repository.create({
      userId,
      name: 'Cat 1',
      icon: 'Icon',
      colorClass: '#fff',
    });

    await repository.create({
      userId,
      name: 'Cat 2',
      icon: 'Icon',
      colorClass: '#fff',
    });

    const categories = await repository.findByUserId(userId);
    expect(categories).toHaveLength(2);
    expect(categories.map(c => c.name)).toEqual(expect.arrayContaining(['Cat 1', 'Cat 2']));
  });
});
