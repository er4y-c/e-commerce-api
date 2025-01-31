import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Categories {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  banner: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop({ type: String, default: null })
  parent: string | null;
}

export type CategoryDocument = HydratedDocument<Categories>;
export const CategorySchema = SchemaFactory.createForClass(Categories);
