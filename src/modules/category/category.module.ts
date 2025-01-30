import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Categories, CategorySchema } from './category.schema';
import { Products, ProductSchema } from '../product/product.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
