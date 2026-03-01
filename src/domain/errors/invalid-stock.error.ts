import { DomainError } from './domain-error';

export class InvalidStockError extends DomainError {
  constructor() {
    super('Stock cannot be negative', 'INVALID_STOCK');
  }
}