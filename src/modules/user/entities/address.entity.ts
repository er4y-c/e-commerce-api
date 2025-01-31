export class Address {
  isDefault: boolean;
  address: string;
  city: string;
  country: string;
  distinct: string;
  zipCode: string;

  constructor(
    isDefault: boolean,
    address: string,
    city: string,
    country: string,
    distinct: string,
    zipCode: string,
  ) {
    this.isDefault = isDefault;
    this.address = address;
    this.city = city;
    this.country = country;
    this.distinct = distinct;
    this.zipCode = zipCode;
  }
}
