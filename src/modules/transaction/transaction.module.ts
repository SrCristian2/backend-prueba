import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTransactionUseCase } from 'src/application/use-cases/transactions/create-transaction.use-case';
import { GetTransactionByIdUseCase } from 'src/application/use-cases/transactions/get-transaction-by-id.use-case';
import { ProcessPaymentUseCase } from 'src/application/use-cases/transactions/process-payment.use-case';
import { WompiAdapter } from 'src/infrastructure/payment/wompi.adapter';
import { CustomerOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/customer.orm-entity';
import { DeliveryOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/delivery.orm-entity';
import { ProductOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/product.orm-entity';
import { TransactionOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/transaction.orm-entity';
import { CustomerRepositoryOrm } from 'src/infrastructure/persistence/typeorm/repositories/customer.repository.typeorm';
import { DeliveryRepositoryOrm } from 'src/infrastructure/persistence/typeorm/repositories/delivery.repository.typeorm';
import { ProductRepositoryTypeOrm } from 'src/infrastructure/persistence/typeorm/repositories/product.repository.typeorm';
import { TransactionRepositoryOrm } from 'src/infrastructure/persistence/typeorm/repositories/transaction.repository.typeorm';
import { TransactionsController } from 'src/interfaces/http/controllers/transactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionOrmEntity,
      ProductOrmEntity,
      CustomerOrmEntity,
      DeliveryOrmEntity,
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    ProcessPaymentUseCase,
    GetTransactionByIdUseCase,
    {
      provide: 'TransactionRepository',
      useClass: TransactionRepositoryOrm,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryTypeOrm,
    },
    {
      provide: 'CustomerRepository',
      useClass: CustomerRepositoryOrm,
    },
    {
      provide: 'DeliveryRepository',
      useClass: DeliveryRepositoryOrm,
    },
    {
      provide: 'PaymentGateway',
      useClass: WompiAdapter,
    },
  ],
})
export class TransactionModule {}
