import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'Product Description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 100,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Price must be greater than 0' })
  price: number;

  @ApiProperty({
    description: 'Gallery paths of the product',
    example: ['image1', 'image2'],
  })
  @IsNotEmpty()
  @IsArray()
  gallery: string[];

  @ApiProperty({
    description: 'Category of the product',
    example: 'Category',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Created date of the product',
    example: new Date(),
  })
  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    description: 'Updated date of the product',
    example: new Date(),
  })
  @IsNotEmpty()
  @IsDateString()
  updated_at: Date;

  @ApiProperty({
    description: 'Stock of the product',
    example: 10,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  stock: number;
}
