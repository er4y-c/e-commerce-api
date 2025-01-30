import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product Name',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'Product Description',
  })
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 100,
  })
  price: number;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Category',
  })
  category: string;

  @ApiProperty({
    description: 'Updated date of the product',
    example: new Date(),
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Stock of the product',
    example: 10,
  })
  stock: number;
}

export class UpdateProductGalleryDto {
  @ApiProperty({
    description: 'Gallery paths of the product',
    example: ['image1', 'image2'],
  })
  gallery: string[];
}
