import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductDocument, Products } from 'src/modules/product/product.schema';
import { InsufficientStockException } from '../exceptions/basket-exceptions';
import { ProductNotFoundException } from '../exceptions';
import { AddToBasketDto } from 'src/modules/basket/dto';

@Injectable()
export class StockValidationPipe implements PipeTransform {
  constructor(
    @InjectModel(Products.name)
    private productModel: Model<ProductDocument>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: AddToBasketDto, metadata: ArgumentMetadata) {
    if (!value) {
      throw new HttpException(
        'No basket data provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.productId) {
      throw new ProductNotFoundException('No product ID provided');
    }

    try {
      const productStock = await this.productModel
        .findById(value.productId)
        .select('stock')
        .exec();

      if (!productStock) {
        throw new ProductNotFoundException(value.productId);
      }

      if (productStock.stock < value.quantity) {
        throw new InsufficientStockException();
      }

      return value;
    } catch (error) {
      console.error('Stock validation error:', error);
      throw error;
    }
  }
}
