import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';

export class TransactionMapper {
  static toDomain(model: TransactionOrmEntity): Transaction {
    return Transaction.fromPersistence({
      id: model.id,
      productId: model.productId,
      amount: model.amount,
      status: model.status,
      customerId: model.customerId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      wompiTransactionId: model.wompiTransactionId,
    });
  }

  static toOrm(entity: Transaction): TransactionOrmEntity {
    const model = new TransactionOrmEntity();

    model.id = entity.id;
    model.productId = entity.productId;
    model.amount = entity.amount;
    model.status = entity.getStatus();
    model.customerId = entity.customerId;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    model.wompiTransactionId = entity.wompiTransactionId;

    return model;
  }
}
