import { DomainError } from './domain-error';

export class InsufficientStockError extends DomainError {
  constructor() {
    super('Not enough stock available', 'INSUFFICIENT_STOCK');
  }
}
