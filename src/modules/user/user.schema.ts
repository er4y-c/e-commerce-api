import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Address {
  @Prop()
  isDefault: boolean;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  distinct: string;

  @Prop()
  zipCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  supabaseUid: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  role: string;

  @Prop()
  userAddress: Address[];

  @Prop()
  billingAddress: Address[];
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
