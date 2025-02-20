import { ApiProperty } from '@nestjs/swagger';

import { Buyer, PaymentCard } from 'src/modules/order/entities';

import {
  SupportedCurrencies,
  PaymentLocales,
} from 'src/shared/payment/payment.interface';

export class InitOrderDto {
  @ApiProperty({
    type: Buyer,
    example: {
      id: '5f4b9b2b-5f4b-9b2b-5f4b-9b2b5f4b9b2b',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '905555555555',
      identityNumber: '11111111111',
    },
    description:
      'Buyer information. The buyer data must be user of the system.',
  })
  buyer: Buyer;

  @ApiProperty({
    type: PaymentCard,
    example: {
      cardHolderName: 'John Doe',
      cardNumber: '5528790000000008',
      expireMonth: '12',
      expireYear: '2030',
      cvc: '123',
    },
  })
  paymentCard: PaymentCard;

  @ApiProperty({
    enum: SupportedCurrencies,
    default: SupportedCurrencies.TRY,
    example: SupportedCurrencies.TRY,
  })
  currency: SupportedCurrencies;

  @ApiProperty({
    enum: PaymentLocales,
    default: PaymentLocales.TR,
    example: PaymentLocales.EN,
    description: 'Locale of payment page. Default value is tr.',
  })
  locale: PaymentLocales;

  @ApiProperty({
    type: 'string',
    example: '123456789',
    description: 'Conversation ID to match request and response',
  })
  conversationId: string;

  @ApiProperty({
    example: 1,
    description:
      'Installment value. For single installment payments it should be 1 (valid values: 1, 2, 3, 6, 9, 12)',
  })
  installments: number;

  @ApiProperty({
    type: 'string',
    example: '5f4b9b2b-5f4b-9b2b-5f4b-9b2b5f4b9b2b',
    description: 'Basket ID',
  })
  basketId: string;
}
