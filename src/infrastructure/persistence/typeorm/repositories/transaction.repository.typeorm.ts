import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';
import { TransactionMapper } from '../mappers/transaction.mapper';

@Injectable()
export class TransactionRepositoryOrm implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionOrmEntity)
    private readonly repository: Repository<TransactionOrmEntity>,
  ) {}

  async findById(id: string): Promise<Transaction | null> {
    const model = await this.repository.findOne({
      where: { id },
    });

    if (!model) return null;

    return TransactionMapper.toDomain(model);
  }

  async save(transaction: Transaction): Promise<void> {
    const model = TransactionMapper.toOrm(transaction);
    await this.repository.save(model);
  }
}