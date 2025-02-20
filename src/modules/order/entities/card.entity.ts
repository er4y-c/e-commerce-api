import { ApiProperty } from '@nestjs/swagger';

export class PaymentCard {
  @ApiProperty()
  cardHolderName: string;

  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  expireMonth: string;

  @ApiProperty()
  expireYear: string;

  @ApiProperty()
  cvc: string;

  @ApiProperty()
  cardAlias: string;
}
