import { NotFoundException, ConflictException } from '@nestjs/common';

export class ExistingCategoryException extends ConflictException {
  constructor(category: string) {
    super(`Category ${category} already exists`);
  }
}

export class ParentCategoryNotFoundException extends NotFoundException {
  constructor(parent: string) {
    super(`Parent category "${parent}" not found`);
  }
}

export class CategoryNotFoundException extends NotFoundException {
  constructor(category: string) {
    super(`Category "${category}" not found`);
  }
}
