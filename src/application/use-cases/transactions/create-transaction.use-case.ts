import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/rop/result';
import {
  DomainError,
  ProductNotFoundError,
  InsufficientStockError,
} from 'src/domain/errors';
import type { ProductRepository } from 'src/domain/repositories/product.repository';
import type { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import type { CustomerRepository } from 'src/domain/repositories/customer.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { Customer } from 'src/domain/entities/customer.entity';
import { randomUUID } from 'crypto';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,

    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
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

    let customer = await this.customerRepository.findByEmail(dto.customerEmail);

    if (!customer) {
      const customerResult = Customer.create({
        id: randomUUID(),
        name: dto.customerName,
        email: dto.customerEmail,
        createdAt: new Date(),
      });

      if (!customerResult.ok) {
        return customerResult;
      }

      customer = customerResult.value;

      await this.customerRepository.save(customer);
    }

    const transactionResult = Transaction.create({
      id: randomUUID(),
      productId: product.id,
      customerId: customer.id,
      amount: product.price,
      createdAt: new Date(),
    });

    if (!transactionResult.ok) {
      return transactionResult;
    }

    const transaction = transactionResult.value;

    await this.transactionRepository.save(transaction);

    return Result.ok({ transactionId: transaction.id });
  }
}
