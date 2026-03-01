import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeliveryRepository } from 'src/domain/repositories/delivery.repository';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';
import { Delivery } from 'src/domain/entities/delivery.entity';
import { DeliveryMapper } from '../mappers/delivery.mapper';

@Injectable()
export class DeliveryRepositoryOrm implements DeliveryRepository {
  constructor(
    @InjectRepository(DeliveryOrmEntity)
    private readonly repository: Repository<DeliveryOrmEntity>,
  ) {}

  async findById(id: string): Promise<Delivery | null> {
    const model = await this.repository.findOne({
      where: { id },
    });

    return model ? DeliveryMapper.toDomain(model) : null;
  }

  async save(delivery: Delivery): Promise<void> {
    const model = DeliveryMapper.toOrm(delivery);
    await this.repository.save(model);
  }
}
