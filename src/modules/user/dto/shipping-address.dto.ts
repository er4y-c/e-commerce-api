import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class ShippingAddressDto {
  @ApiProperty({
    description: 'Address of the user',
    example: 'Kültür mah. 123. sok. no: 1',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'City of the user',
    example: 'Izmir',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Country of the user',
    example: 'Turkey',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Distinct of the user',
    example: 'Konak',
  })
  @IsNotEmpty()
  @IsString()
  distinct: string;

  @ApiProperty({
    description: 'Zip code of the user',
    example: '35060',
  })
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiProperty({
    description: 'Is default address',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;
}
