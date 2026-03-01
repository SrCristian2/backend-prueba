import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/rop/result';
import {
  DomainError,
  ProductNotFoundError,
  InsufficientStockError,
} from 'src/domain/errors';
import type { ProductRepository } from 'src/domain/repositories/product.repository';
import type { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionStatus } from 'src/domain/enums/transaction-status.enum';
import { randomUUID } from 'crypto';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    dto: CreateTransactionDto,
  ): Promise<Result<{ transactionId: string }, DomainError>> {
    const product = await this.productRepository.findById(dto.productId);

    if (!product) {
      return Result.fail(new ProductNotFoundError(dto.productId));
    }

    if (!product.hasStock()) {
      return Result.fail(new InsufficientStockError());
    }

    const transaction = new Transaction(
      randomUUID(),
      product.id,
      product.price,
      TransactionStatus.PENDING,
      dto.customerEmail,
      new Date(),
      new Date(),
    );

    await this.transactionRepository.save(transaction);

    return Result.ok({ transactionId: transaction.id });
  }
}
