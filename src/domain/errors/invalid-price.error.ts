import { DomainError } from './domain-error';

export class InvalidPriceError extends DomainError {
  constructor() {
    super('Price cannot be negative', 'INVALID_PRICE');
  }
}