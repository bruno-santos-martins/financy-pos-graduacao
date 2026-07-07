import { z } from 'zod';
import { ITransactionRepository } from '../../ports/repositories/ITransactionRepository.js';

const createTransactionSchema = z.object({
  userId: z.string().min(1, 'O ID do usuário é obrigatório'),
  description: z.string().min(2, 'A descrição deve ter pelo menos 2 caracteres'),
  amount: z.number({ invalid_type_error: 'O valor deve ser numérico' }).positive('O valor deve ser maior que zero'),
  type: z.enum(['INCOME', 'EXPENSE'], { errorMap: () => ({ message: 'O tipo deve ser Entrada ou Saída' }) }),
  date: z.date({ invalid_type_error: 'Data inválida' }).or(
    z.string().transform(str => {
      const parsedDate = new Date(str);
      if (isNaN(parsedDate.getTime())) throw new Error('Data inválida');
      return parsedDate;
    })
  ),
  categoryId: z.string().optional().nullable(),
});

type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: CreateTransactionInput) {
    const data = createTransactionSchema.parse(input);
    return this.transactionRepository.create(data);
  }
}
