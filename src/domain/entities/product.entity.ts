import { Result } from 'src/shared/rop/result';
import {
  DomainError,
  InsufficientStockError,
  InvalidQuantityError,
} from '../errors';
import { InvalidPriceError } from '../errors/invalid-price.error';
import { InvalidStockError } from '../errors/invalid-stock.error';

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public imageUrl: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    if (price < 0) {
      throw new InvalidPriceError();
    }

    if (stock < 0) {
      throw new InvalidStockError();
    }
  }

  hasStock(): boolean {
    return this.stock > 0;
  }

  decreaseStock(quantity: number): Result<void, DomainError> {
    if (quantity <= 0) {
      return Result.fail(new InvalidQuantityError());
    }

    if (this.stock < quantity) {
      return Result.fail(new InsufficientStockError());
    }

    this.stock -= quantity;

    return Result.ok(undefined);
  }
}
