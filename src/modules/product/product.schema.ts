import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Products {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  gallery: string[];

  @Prop()
  category: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  stock: number;
}

export type ProductDocument = HydratedDocument<Products>;
export const ProductSchema = SchemaFactory.createForClass(Products);
