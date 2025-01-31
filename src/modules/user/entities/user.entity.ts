import { Address } from './address.entity';

export class User {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  supabaseUid: string;
  createdAt: Date;
  role: string;
  userAddress: Address[];
  billingAddress: Address[];

  constructor(
    _id: string,
    name: string,
    surname: string,
    phone: string,
    email: string,
    supabaseUid: string,
    createdAt: Date,
    role: string,
    userAddress: Address[],
    billingAddress: Address[],
  ) {
    this._id = _id;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.supabaseUid = supabaseUid;
    this.createdAt = createdAt;
    this.role = role;
    this.userAddress = userAddress;
    this.billingAddress = billingAddress;
  }
}
