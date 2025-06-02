import { Module } from '@nestjs/common';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ProductsModule,
    SalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
