import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket, BasketSchema } from './basket.schema';
import { Products, ProductSchema } from '../product/product.schema';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { StockValidationPipe } from 'src/common/pipes/basket.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Basket.name, schema: BasketSchema }]),
    forwardRef(() => ProductModule),
  ],
  controllers: [BasketController],
  providers: [BasketService, ProductService, StockValidationPipe],
})
export class BasketModule {}
