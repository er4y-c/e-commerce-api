import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Address {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

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

  @Prop({ type: [AddressSchema] })
  userAddress: Address[];

  @Prop({ type: [AddressSchema] })
  billingAddress: Address[];
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
