import { Result } from 'src/shared/rop/result';
import { DomainError } from '../errors/domain-error';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { InvalidTransactionStateError } from '../errors/invalid-transaction-state.error';

export class Transaction {
  private constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly customerId: string,
    public readonly amount: number,
    private status: TransactionStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public wompiTransactionId?: string,
  ) {}

  static create(input: {
    id: string;
    productId: string;
    customerId: string;
    amount: number;
    createdAt: Date;
  }): Result<Transaction, DomainError> {
    if (input.amount <= 0) {
      return Result.fail(new InvalidTransactionStateError());
    }

    return Result.ok(
      new Transaction(
        input.id,
        input.productId,
        input.customerId,
        input.amount,
        TransactionStatus.PENDING,
        input.createdAt,
        input.createdAt,
      ),
    );
  }

  static fromPersistence(input: {
    id: string;
    productId: string;
    customerId: string;
    amount: number;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
    wompiTransactionId?: string;
  }): Transaction {
    return new Transaction(
      input.id,
      input.productId,
      input.customerId,
      input.amount,
      input.status,
      input.createdAt,
      input.updatedAt,
      input.wompiTransactionId,
    );
  }

  getStatus(): TransactionStatus {
    return this.status;
  }

  approve(wompiTransactionId: string): Result<void, DomainError> {
    if (this.status !== TransactionStatus.PENDING) {
      return Result.fail(new InvalidTransactionStateError());
    }

    this.status = TransactionStatus.APPROVED;
    this.wompiTransactionId = wompiTransactionId;
    this.updatedAt = new Date();

    return Result.ok(undefined);
  }

  decline(): Result<void, DomainError> {
    if (this.status !== TransactionStatus.PENDING) {
      return Result.fail(new InvalidTransactionStateError());
    }

    this.status = TransactionStatus.DECLINED;
    this.updatedAt = new Date();

    return Result.ok(undefined);
  }
}
