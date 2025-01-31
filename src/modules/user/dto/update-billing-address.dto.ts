import { PartialType, OmitType } from '@nestjs/mapped-types';

import { BillingAddressDto } from './billing-address.dto';

export class UpdateBillingAddressDto extends PartialType(
  OmitType(BillingAddressDto, ['isDefault'] as const),
) {}
