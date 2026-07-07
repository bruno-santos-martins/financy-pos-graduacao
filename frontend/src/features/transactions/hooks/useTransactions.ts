import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../services/transactionService';

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getTransactions(),
  });
}
