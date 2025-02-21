import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { BasketItem } from '../basket/basket.schema';

@Schema()
export class Buyer {
  @Prop()
  id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  identityNumber: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  ip: string;

  @Prop()
  registrationDate: Date;

  @Prop()
  registrationAddress: string;
}

@Schema()
export class Billing {
  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  zipCode: string;

  @Prop()
  contactName: string;
}

@Schema({ timestamps: true })
export class Orders {
  @Prop()
  price: number;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  currency: string;

  @Prop()
  locale: string;

  @Prop()
  paidPrice: number;

  @Prop()
  installment: number;

  @Prop()
  paymentChannel: string;

  @Prop()
  paymentGroup: string;

  @Prop()
  paymentId: string;

  @Prop()
  basketId: Types.ObjectId;

  @Prop()
  conversationId: string;

  @Prop()
  buyer: Buyer;

  @Prop()
  billingAddress: Billing;

  @Prop()
  basketItems: BasketItem[];
}

export type OrderDocument = HydratedDocument<Orders>;
export const OrderSchema = SchemaFactory.createForClass(Orders);
