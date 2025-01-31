import { PartialType, OmitType } from '@nestjs/mapped-types';

import { ShippingAddressDto } from './shipping-address.dto';

export class UpdateShippingAddressDto extends PartialType(
  OmitType(ShippingAddressDto, ['isDefault'] as const),
) {}
