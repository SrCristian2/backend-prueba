import { TransactionStatus } from '../enums/transaction-status.enum';
import { InvalidTransactionStateError } from '../errors';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly amount: number,
    private status: TransactionStatus,
    public readonly customerEmail: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public wompiTransactionId?: string,
  ) {}

  getStatus(): TransactionStatus {
    return this.status;
  }

  approve(wompiTransactionId: string) {
    if (this.status !== TransactionStatus.PENDING) {
      throw new InvalidTransactionStateError();
    }

    this.status = TransactionStatus.APPROVED;
    this.wompiTransactionId = wompiTransactionId;
    this.updatedAt = new Date();
  }

  decline() {
    if (this.status !== TransactionStatus.PENDING) {
      throw new InvalidTransactionStateError();
    }

    this.status = TransactionStatus.DECLINED;
    this.updatedAt = new Date();
  }
}
