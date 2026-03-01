import { Transaction } from 'src/domain/entities/transaction.entity';

export interface TransactionRepository {
  findById(id: string): Promise<Transaction | null>;
  save(transaction: Transaction): Promise<void>;
}
