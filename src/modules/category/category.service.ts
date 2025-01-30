import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductDocument, Products } from '../product/product.schema';
import { Categories, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ExistingCategoryException,
  CategoryNotFoundException,
} from 'src/common/exceptions/category-exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Categories.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Products.name)
    private productModel: Model<ProductDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (existingCategory) {
      throw new ExistingCategoryException(createCategoryDto.name);
    }
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll() {
    const categories = await this.categoryModel.find({ parent: null }).exec();
    const categoriesWithSubcategories = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await this.categoryModel
          .find({ parent: category.name })
          .exec();
        return {
          ...category.toObject(),
          subcategories,
        };
      }),
    );
    return categoriesWithSubcategories;
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    const subcategories = await this.categoryModel
      .find({ parent: category.name })
      .exec();
    const products = await this.productModel
      .find({ category: category.name })
      .exec();
    return {
      ...category.toObject(),
      subcategories,
      products,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto)
      .exec();
    if (!existingCategory) {
      throw new CategoryNotFoundException(id);
    }
    return existingCategory;
  }

  async remove(id: string) {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory) {
      throw new CategoryNotFoundException(id);
    }
    return deletedCategory;
  }
}
