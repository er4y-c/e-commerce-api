import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToBasketDto {
  @ApiProperty({
    description: 'Product id',
    example: '60f7b3f0d9f4f4002f2e5e1b',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Product count',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Product category',
    example: 'Category',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description:
      'Product subcategory. If there is no subcategory, it can be the same as the category',
    example: 'Subcategory',
  })
  @IsNotEmpty()
  subcategory: string;
}
