import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Categories, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExistingCategoryException } from 'src/common/exceptions/category-exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Categories.name)
    private categoryModel: Model<CategoryDocument>,
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
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto)
      .exec();
    if (!existingCategory) {
      throw new Error('Category not found');
    }
    return existingCategory;
  }

  async remove(id: string) {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory) {
      throw new Error('Category not found');
    }
    return deletedCategory;
  }
}
