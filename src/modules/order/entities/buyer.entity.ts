import { ApiProperty } from '@nestjs/swagger';

export class Buyer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  identityNumber: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  ip: string;

  @ApiProperty()
  registrationDate: string;

  @ApiProperty()
  registrationAddress: string;
}
