import { ApiProperty } from '@nestjs/swagger';

export class BasketItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}

export class Basket {
  @ApiProperty({ type: () => [BasketItem] })
  items: BasketItem[];
}
