import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Product #${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class MissingProductDataException extends HttpException {
  constructor() {
    super('Missing product data', HttpStatus.BAD_REQUEST);
  }
}
