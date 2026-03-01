import { DomainError } from './domain-error';

export class InvalidQuantityError extends DomainError {
  constructor() {
    super('Quantity must be greater than zero', 'INVALID_QUANTITY');
  }
}
