import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { StoreModule } from './admin/store/store.module';
import { ProductModule } from './admin/product/product.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SeedModule } from './seed/seed.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    DatabaseModule, AuthModule, CustomerModule, StoreModule, ProductModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
