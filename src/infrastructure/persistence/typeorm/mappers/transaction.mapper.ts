import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';

export class TransactionMapper {
  static toDomain(model: TransactionOrmEntity): Transaction {
    return new Transaction(
      model.id,
      model.productId,
      model.amount,
      model.status,
      model.customerEmail,
      model.createdAt,
      model.updatedAt,
      model.wompiTransactionId,
    );
  }

  static toOrm(entity: Transaction): TransactionOrmEntity {
    const model = new TransactionOrmEntity();

    model.id = entity.id;
    model.productId = entity.productId;
    model.amount = entity.amount;
    model.status = entity.getStatus();
    model.customerEmail = entity.customerEmail;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    model.wompiTransactionId = entity.wompiTransactionId;

    return model;
  }
}
