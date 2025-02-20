import { ApiProperty } from '@nestjs/swagger';
import { PaymentLocales } from 'src/shared/payment';

export class InstallmentCheckDto {
  @ApiProperty({
    description: 'Total amount for installment plans',
    example: '10000',
  })
  price: string;

  @ApiProperty({
    description: 'First 6 digits of card',
    example: '454360',
  })
  binNumber: string;

  @ApiProperty({
    enum: PaymentLocales,
    default: PaymentLocales.TR,
    example: PaymentLocales.EN,
    description: 'Locale of payment page. Default value is tr.',
  })
  locale: string;

  @ApiProperty({
    description: 'Conversation ID to match request and response',
    example: '123456789',
  })
  conversationId: string;
}
