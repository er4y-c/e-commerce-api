import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CheckStockDto, AddToBasketDto, UpdateBasketItemDto } from './dto';
import { Products, ProductDocument } from '../product/product.schema';
import { ProductNotFoundException } from 'src/common/exceptions';
import { InsufficientStockException } from 'src/common/exceptions/basket-exceptions';
import { Basket, BasketDocument } from './basket.schema';
import { ProductService } from '../product/product.service';

@Injectable()
export class BasketService {
  private productService: ProductService;
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductDocument>,
    @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,
    @Inject(ProductService) productService: ProductService,
  ) {
    this.productService = productService;
  }
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
  async getBasket(userId: string): Promise<BasketDocument> {
    let basket = await this.basketModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!basket) {
      basket = await this.basketModel.create({
        userId: new Types.ObjectId(userId),
        items: [],
        totalAmount: 0,
      });
    }

    return basket;
  }

  async addToBasket(
    userId: string,
    basketItem: AddToBasketDto,
  ): Promise<Basket> {
    const basket = await this.getBasket(userId);
    const existingItemIndex = basket.items.findIndex(
      (item) => item.productId.toString() === basketItem.productId,
    );

    if (existingItemIndex > -1) {
      basket.items[existingItemIndex].quantity += basketItem.quantity;
    } else {
      const productMetadata = await this.productService.findOne(
        basketItem.productId,
      );
      basket.items.push({
        productId: new Types.ObjectId(basketItem.productId),
        name: productMetadata.name,
        quantity: basketItem.quantity,
        addedAt: new Date(),
        category: basketItem.category,
        subcategory: basketItem.subcategory,
      });
    }
    return basket.save();
  }

  async updateBasketItem(
    userId: string,
    dto: UpdateBasketItemDto,
  ): Promise<Basket> {
    const basket = await this.getBasket(userId);
    const itemIndex = basket.items.findIndex(
      (item) => item.productId.toString() === dto.productId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Ürün sepette bulunamadı');
    }

    if (dto.quantity === 0) {
      basket.items.splice(itemIndex, 1);
    } else {
      basket.items[itemIndex].quantity = dto.quantity;
    }
    return basket.save();
  }

  async clearBasket(userId: string): Promise<void> {
    await this.basketModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { items: [], totalAmount: 0 },
    );
  }
}
