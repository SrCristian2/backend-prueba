import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerRepository } from 'src/domain/repositories/customer.repository';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerOrmEntity } from '../entities/customer.orm-entity';
import { CustomerMapper } from '../mappers/customer.mapper';

@Injectable()
export class CustomerRepositoryOrm implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly repository: Repository<CustomerOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<Customer | null> {
    const model = await this.repository.findOne({
      where: { email },
    });

    return model ? CustomerMapper.toDomain(model) : null;
  }

  async findById(id: string): Promise<Customer | null> {
    const model = await this.repository.findOne({
      where: { id },
    });

    return model ? CustomerMapper.toDomain(model) : null;
  }

  async save(customer: Customer): Promise<void> {
    const model = CustomerMapper.toOrm(customer);
    await this.repository.save(model);
  }
}
