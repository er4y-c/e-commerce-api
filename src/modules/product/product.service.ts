import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products, ProductDocument } from './product.schema';
import { ProductNotFoundException } from 'src/common/exceptions';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.save();
  }

  async findAll(): Promise<Products[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Products> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const existingProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!existingProduct) {
      throw new ProductNotFoundException(id);
    }
    return existingProduct;
  }

  async remove(id: string): Promise<Products> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new ProductNotFoundException(id);
    }
    return deletedProduct;
  }
}
