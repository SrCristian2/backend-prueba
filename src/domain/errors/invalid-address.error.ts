import { DomainError } from './domain-error';

export class InvalidAddressError extends DomainError {
  constructor() {
    super('Invalid address', 'INVALID_ADDRESS');
  }
}
