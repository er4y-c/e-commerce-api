import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBasketItemDto {
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
  @Min(0)
  quantity: number;
}
