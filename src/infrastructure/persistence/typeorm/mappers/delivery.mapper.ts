import { Delivery } from 'src/domain/entities/delivery.entity';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';

export class DeliveryMapper {
  static toDomain(model: DeliveryOrmEntity): Delivery {
    return Delivery.fromPersistence({
      id: model.id,
      transactionId: model.transactionId,
      address: model.address,
      city: model.city,
      country: model.country,
      createdAt: model.createdAt,
    });
  }

  static toOrm(entity: Delivery): DeliveryOrmEntity {
    const model = new DeliveryOrmEntity();
    model.id = entity.id;
    model.transactionId = entity.transactionId;
    model.address = entity.address;
    model.city = entity.city;
    model.country = entity.country;
    return model;
  }
}
