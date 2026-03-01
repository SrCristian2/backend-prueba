import { Controller, Get, Param, HttpException } from '@nestjs/common';

import { GetProductsUseCase } from 'src/application/use-cases/products/get-products.use-case';
import { GetProductByIdUseCase } from 'src/application/use-cases/products/get-product-by-id.use-case';
import { mapDomainErrorToHttp } from 'src/interfaces/mappers/domain-error.mapper';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Get()
  async findAll() {
    const result = await this.getProductsUseCase.execute();

    if (!result.ok) {
      const httpError = mapDomainErrorToHttp(result.error as any);
      throw new HttpException(httpError.body, httpError.status);
    }

    return result.value;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.getProductByIdUseCase.execute(id);

    if (!result.ok) {
      const httpError = mapDomainErrorToHttp(result.error);
      throw new HttpException(httpError.body, httpError.status);
    }

    return result.value;
  }
}
