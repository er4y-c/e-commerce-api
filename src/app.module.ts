import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from './common/config';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BasketModule } from './modules/basket/basket.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ProductModule,
    BasketModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
    }),
    MongooseModule.forRoot(config().mongo),
    UserModule,
    AuthModule,
    OrderModule,
  ],
})
export class AppModule {}
