import { DomainError } from './domain-error';

export class InvalidTransactionStateError extends DomainError {
  constructor() {
    super(
      'Transaction cannot change state from current status',
      'INVALID_TRANSACTION_STATE',
    );
  }
}