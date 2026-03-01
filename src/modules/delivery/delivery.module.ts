import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/delivery.orm-entity';
import { DeliveryRepositoryOrm } from 'src/infrastructure/persistence/typeorm/repositories/delivery.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOrmEntity])],
  providers: [
    {
      provide: 'DeliveryRepository',
      useClass: DeliveryRepositoryOrm,
    },
  ],
})
export class DeliveryModule {}
