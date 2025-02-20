import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BasketModule } from '../basket/basket.module';
import { BasketService } from '../basket/basket.service';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { Orders, OrderSchema } from './order.schema';

@Module({
  imports: [
    forwardRef(() => BasketModule),
    forwardRef(() => ProductModule),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, BasketService, ProductService],
})
export class OrderModule {}
