import { DomainError } from './domain-error';

export class InvalidCustomerNameError extends DomainError {
  constructor() {
    super('Customer name is invalid', 'INVALID_CUSTOMER_NAME');
  }
}