import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/rop/result';
import { DomainError } from 'src/domain/errors/domain-error';
import type { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { InvalidTransactionStateError } from 'src/domain/errors/invalid-transaction-state.error';

@Injectable()
export class GetTransactionByIdUseCase {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<Result<Transaction, DomainError>> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      return Result.fail(new InvalidTransactionStateError());
    }

    return Result.ok(transaction);
  }
}