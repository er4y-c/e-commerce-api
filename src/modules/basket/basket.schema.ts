import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BasketItem {
  @Prop({
    type: Types.ObjectId,
    ref: 'Products',
    required: true,
  })
  productId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop()
  imageUrl?: string;

  @Prop()
  addedAt: Date;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subcategory: string;
}

@Schema({ timestamps: true })
export class Basket {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ type: [BasketItem], default: [] })
  items: BasketItem[];
}

export type BasketDocument = HydratedDocument<Basket>;
export const BasketSchema = SchemaFactory.createForClass(Basket);
