import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetProductByIdUseCase } from 'src/application/use-cases/products/get-product-by-id.use-case';
import { GetProductsUseCase } from 'src/application/use-cases/products/get-products.use-case';
import { CustomerOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/customer.orm-entity';
import { CustomerRepositoryOrm } from 'src/infrastructure/persistence/typeorm/repositories/customer.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity])],
  controllers: [],
  providers: [
    GetProductsUseCase,
    GetProductByIdUseCase,
    {
      provide: 'CustomerRepository',
      useClass: CustomerRepositoryOrm,
    },
  ],
})
export class CustomerModule {}
