import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CheckStockDto {
  @ApiProperty({
    description: 'Product ID',
    example: '60f8b7b7a7c4f3001f9f9b1b',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 5,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be greater than 0' })
  quantity: number;
}
