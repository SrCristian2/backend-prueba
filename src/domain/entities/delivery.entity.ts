import { Result } from 'src/shared/rop/result';
import { DomainError, InvalidAddressError } from '../errors';

export class Delivery {
  private constructor(
    public readonly id: string,
    public readonly transactionId: string,
    public readonly address: string,
    public readonly city: string,
    public readonly country: string,
    public readonly createdAt: Date,
  ) {}

  static create(input: {
    id: string;
    transactionId: string;
    address: string;
    city: string;
    country: string;
    createdAt: Date;
  }): Result<Delivery, DomainError> {
    if (!input.address || input.address.trim().length === 0) {
      return Result.fail(new InvalidAddressError());
    }

    return Result.ok(
      new Delivery(
        input.id,
        input.transactionId,
        input.address,
        input.city,
        input.country,
        input.createdAt,
      ),
    );
  }

  static fromPersistence(input: {
    id: string;
    transactionId: string;
    address: string;
    city: string;
    country: string;
    createdAt: Date;
  }): Delivery {
    return new Delivery(
      input.id,
      input.transactionId,
      input.address,
      input.city,
      input.country,
      input.createdAt,
    );
  }
}
