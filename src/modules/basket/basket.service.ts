import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CheckStockDto } from './dto/check-stock.dto';
import { Products, ProductDocument } from '../product/product.schema';
import { ProductNotFoundException } from 'src/common/exceptions';
import { InsufficientStockException } from 'src/common/exceptions/basket-exceptions';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductDocument>,
  ) {}
  async checkStock(checkStockDto: CheckStockDto): Promise<void> {
    const productStock = await this.productModel
      .findById(checkStockDto.productId)
      .select('stock')
      .exec();
    if (!productStock) {
      throw new ProductNotFoundException(checkStockDto.productId);
    }
    if (productStock.stock < checkStockDto.quantity) {
      throw new InsufficientStockException();
    }
  }
}
