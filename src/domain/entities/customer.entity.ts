import { Result } from 'src/shared/rop/result';
import { DomainError } from '../errors/domain-error';
import { InvalidCustomerEmailError, InvalidCustomerNameError } from '../errors';

export class Customer {
  private constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(input: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  }): Result<Customer, DomainError> {
    if (!input.email || !input.email.includes('@')) {
      return Result.fail(new InvalidCustomerEmailError());
    }

    if (!input.name || input.name.trim().length === 0) {
      return Result.fail(new InvalidCustomerNameError());
    }

    return Result.ok(
      new Customer(
        input.id,
        input.name,
        input.email,
        input.createdAt,
        new Date(),
      ),
    );
  }

  static fromPersistence(input: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }): Customer {
    return new Customer(
      input.id,
      input.name,
      input.email,
      input.createdAt,
      input.updatedAt,
    );
  }
}
