import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Category', description: 'Name of the category' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Category Description',
    description: 'Description of the category',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'banner.jpg',
    description: 'Banner path of the category',
  })
  @IsNotEmpty()
  @IsString()
  banner: string;

  @ApiProperty({
    example: 'Parent Category',
    description: "Parent category's name of the category",
    nullable: true,
  })
  @IsString()
  @IsOptional()
  parent: string | null;

  @ApiProperty({
    example: new Date(),
    description: 'Created date of the category',
  })
  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    example: new Date(),
    description: 'Updated date of the category',
  })
  @IsNotEmpty()
  @IsDateString()
  updated_at: Date;
}
