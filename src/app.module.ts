import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/persistence/database.module';
import { AppConfigModule } from './infrastructure/config.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
