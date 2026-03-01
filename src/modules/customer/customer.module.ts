import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/customer.orm-entity';
import { CustomerRepositoryOrm } from 'src/infrastructure/persistence/typeorm/repositories/customer.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity])],
  controllers: [],
  providers: [
    {
      provide: 'CustomerRepository',
      useClass: CustomerRepositoryOrm,
    },
  ],
})
export class CustomerModule {}
