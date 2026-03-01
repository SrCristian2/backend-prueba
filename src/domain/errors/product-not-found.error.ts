import { DomainError } from './domain-error';

export class ProductNotFoundError extends DomainError {
  constructor(productId: string) {
    super(`Product with id ${productId} not found`, 'PRODUCT_NOT_FOUND');
  }
}
