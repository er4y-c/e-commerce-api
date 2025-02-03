import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Products, ProductSchema } from './product.schema';
import { BasketModule } from '../basket/basket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
    forwardRef(() => BasketModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [
    ProductService,
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
  ],
})
export class ProductModule {}
