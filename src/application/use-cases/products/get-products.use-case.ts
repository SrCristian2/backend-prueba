import { Inject, Injectable } from '@nestjs/common';
import type { ProductRepository } from 'src/domain/repositories/product.repository';
import type { Product } from 'src/domain/entities/product.entity';
import { Result } from 'src/shared/rop/result';
import { DomainError } from 'src/domain/errors';

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(): Promise<Result<Product[], DomainError>> {
    const products = await this.productRepository.findAll();
    return Result.ok(products);
  }
}
