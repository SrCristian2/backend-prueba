import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductMapper } from '../mappers/product.mapper';
import { Product } from 'src/domain/entities/product.entity';
import { ProductRepository } from 'src/domain/repositories/product.repository';

@Injectable()
export class ProductRepositoryTypeOrm implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repo: Repository<ProductOrmEntity>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.repo.find();
    return products.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.repo.findOne({
      where: { id },
    });

    if (!product) return null;

    return ProductMapper.toDomain(product);
  }

  async save(product: Product): Promise<void> {
    const ormEntity = ProductMapper.toOrm(product);
    await this.repo.save(ormEntity);
  }
}
