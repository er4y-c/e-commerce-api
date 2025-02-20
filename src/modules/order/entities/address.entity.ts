import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  contactName: string;
}
