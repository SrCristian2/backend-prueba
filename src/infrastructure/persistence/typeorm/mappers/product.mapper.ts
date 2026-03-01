import { Product } from 'src/domain/entities/product.entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';

export class ProductMapper {
  static toDomain(model: ProductOrmEntity): Product {
    return new Product(
      model.id,
      model.name,
      model.description,
      Number(model.price),
      model.stock,
      model.imageUrl,
      model.createdAt,
      model.updatedAt,
    );
  }

  static toOrm(entity: Product): ProductOrmEntity {
    const model = new ProductOrmEntity();

    model.id = entity.id;
    model.name = entity.name;
    model.description = entity.description;
    model.price = entity.price;
    model.stock = entity.stock;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;

    return model;
  }
}
