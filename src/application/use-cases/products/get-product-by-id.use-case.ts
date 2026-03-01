import { Inject, Injectable } from '@nestjs/common';
import type { ProductRepository } from 'src/domain/repositories/product.repository';
import type { Product } from 'src/domain/entities/product.entity';
import { Result } from 'src/shared/rop/result';
import { DomainError, ProductNotFoundError } from 'src/domain/errors';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}
  async execute(id: string): Promise<Result<Product, DomainError>> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return Result.fail(new ProductNotFoundError(id));
    }

    return Result.ok(product);
  }
}
