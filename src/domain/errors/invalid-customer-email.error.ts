import { DomainError } from './domain-error';

export class InvalidCustomerEmailError extends DomainError {
  constructor() {
    super('Customer email is invalid', 'INVALID_CUSTOMER_EMAIL');
  }
}