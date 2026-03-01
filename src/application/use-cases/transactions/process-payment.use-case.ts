import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/rop/result';
import { DomainError } from 'src/domain/errors/domain-error';
import type { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import type { ProductRepository } from 'src/domain/repositories/product.repository';
import type { PaymentGateway } from 'src/application/ports/payment-gateway.port';
import { ProcessPaymentDto } from '../../dto/process-payment.dto';
import { TransactionStatus } from 'src/domain/enums/transaction-status.enum';
import { ProductNotFoundError } from 'src/domain/errors/product-not-found.error';
import { InsufficientStockError } from 'src/domain/errors/insufficient-stock.error';
import { InvalidTransactionStateError } from 'src/domain/errors/invalid-transaction-state.error';

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,

    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('PaymentGateway')
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async execute(
    dto: ProcessPaymentDto,
  ): Promise<Result<{ status: string }, DomainError>> {
    const transaction = await this.transactionRepository.findById(
      dto.transactionId,
    );

    if (!transaction) {
      return Result.fail(new InvalidTransactionStateError());
    }

    if (transaction.getStatus() !== TransactionStatus.PENDING) {
      return Result.fail(new InvalidTransactionStateError());
    }

    const product = await this.productRepository.findById(
      transaction.productId,
    );

    if (!product) {
      return Result.fail(new ProductNotFoundError(transaction.productId));
    }

    if (!product.hasStock()) {
      return Result.fail(new InsufficientStockError());
    }

    const paymentResult = await this.paymentGateway.charge({
      amount: transaction.amount,
      cardToken: dto.cardToken,
      customerEmail: transaction.customerEmail,
    });

    if (paymentResult.status === 'DECLINED') {
      transaction.decline();
      await this.transactionRepository.save(transaction);

      return Result.ok({ status: 'DECLINED' });
    }

    transaction.approve(paymentResult.transactionId);
    const stockResult = product.decreaseStock(1);

    if (!stockResult.ok) {
      return stockResult;
    }

    await this.transactionRepository.save(transaction);
    await this.productRepository.save(product);

    return Result.ok({ status: 'APPROVED' });
  }
}
