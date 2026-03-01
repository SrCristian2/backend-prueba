import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetProductByIdUseCase } from 'src/application/use-cases/products/get-product-by-id.use-case';
import { GetProductsUseCase } from 'src/application/use-cases/products/get-products.use-case';
import { ProductOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/product.orm-entity';
import { ProductRepositoryTypeOrm } from 'src/infrastructure/persistence/typeorm/repositories/product.repository.typeorm';
import { ProductsController } from 'src/interfaces/http/controllers/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductsController],
  providers: [
    GetProductsUseCase,
    GetProductByIdUseCase,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryTypeOrm,
    },
  ],
})
export class ProductModule {}
