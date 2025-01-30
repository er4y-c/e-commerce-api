import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Products, ProductSchema } from '../product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
