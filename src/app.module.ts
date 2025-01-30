import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from './common/config';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BasketModule } from './modules/basket/basket.module';

@Module({
  imports: [
    ProductModule,
    BasketModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(config().mongo),
  ],
})
export class AppModule {}
