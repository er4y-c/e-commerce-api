/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Categories,
  CategoryDocument,
} from '../../modules/category/category.schema';
import { CreateCategoryDto } from 'src/modules/category/dto/create-category.dto';
import { ParentCategoryNotFoundException } from '../exceptions/category-exception';

@Injectable()
export class ValidateParentCategoryPipe implements PipeTransform {
  constructor(
    @InjectModel(Categories.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async transform(value: CreateCategoryDto, metadata: ArgumentMetadata) {
    if (value && value.parent) {
      const parentCategory = await this.categoryModel.findOne({
        name: value.parent,
      });

      if (!parentCategory) {
        throw new ParentCategoryNotFoundException(value.parent);
      }
    }

    return value;
  }
}

@Injectable()
export class ValidateExistsCategoryPipe implements PipeTransform {
  constructor(
    @InjectModel(Categories.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async transform(value: CreateCategoryDto, metadata: ArgumentMetadata) {
    const existingCategory = await this.categoryModel.findOne({
      name: value.name,
    });

    if (existingCategory) {
      throw new NotFoundException(`Category ${value.name} already exists`);
    }

    return value;
  }
}
