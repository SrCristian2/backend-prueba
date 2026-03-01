import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerOrmEntity } from '../entities/customer.orm-entity';

export class CustomerMapper {
  static toDomain(model: CustomerOrmEntity): Customer {
    return Customer.fromPersistence({
      id: model.id,
      name: model.name,
      email: model.email,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toOrm(entity: Customer): CustomerOrmEntity {
    const model = new CustomerOrmEntity();
    model.id = entity.id;
    model.name = entity.name;
    model.email = entity.email;
    model.updatedAt = entity.updatedAt;
    return model;
  }
}
