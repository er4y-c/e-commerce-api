import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Users, UsersDocument } from './user.schema';
import {
  ShippingAddressDto,
  BillingAddressDto,
  UpdateShippingAddressDto,
  UpdateBillingAddressDto,
} from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async addAddress(
    userId: string | undefined,
    addressDto: ShippingAddressDto | BillingAddressDto,
    addressKey: 'userAddress' | 'billingAddress',
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    if (addressKey !== 'userAddress' && addressKey !== 'billingAddress') {
      throw new BadRequestException('Invalid address key');
    }
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (addressDto.isDefault) {
      const hasDefaultAddress = user[addressKey].some(
        (address) => address.isDefault,
      );
      if (hasDefaultAddress) {
        throw new BadRequestException(
          `Default ${addressKey === 'userAddress' ? 'shipping' : 'billing'} address alredy exists`,
        );
      }
    }

    user[addressKey].push({
      ...addressDto,
      _id: new Types.ObjectId(),
    });
    await user.save();
    return { message: 'The address has been successfully added.' };
  }

  async updateDefaultAddress(
    userId: string | undefined,
    addressId: string,
    addressKey: 'userAddress' | 'billingAddress',
  ): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user || !userId) {
      throw new UnauthorizedException('User not found');
    }
    if (addressKey !== 'userAddress' && addressKey !== 'billingAddress') {
      throw new BadRequestException('Invalid address key');
    }
    user[addressKey].forEach((address) => {
      address.isDefault = false;
    });

    const address = user[addressKey].find(
      (addr) => addr._id.toString() === addressId,
    );
    if (!address) {
      throw new BadRequestException('Address not found');
    }
    address.isDefault = true;

    await user.save();
    return { message: 'Default address has been updated.' };
  }

  async updateAddress(
    userId: string | undefined,
    addressId: string,
    addressDto: UpdateShippingAddressDto | UpdateBillingAddressDto,
    addressKey: 'userAddress' | 'billingAddress',
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    if (addressKey !== 'userAddress' && addressKey !== 'billingAddress') {
      throw new BadRequestException('Invalid address key');
    }
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const addressIndex = user[addressKey].findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      throw new BadRequestException('Address not found');
    }

    user[addressKey][addressIndex] = {
      ...user[addressKey][addressIndex],
      ...addressDto,
    };

    await user.save();
    return { message: 'The address has been successfully updated.' };
  }

  async deleteAddress(
    userId: string | undefined,
    addressId: string,
    addressKey: 'userAddress' | 'billingAddress',
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    if (addressKey !== 'userAddress' && addressKey !== 'billingAddress') {
      throw new BadRequestException('Invalid address key');
    }
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const addressIndex = user[addressKey].findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      throw new BadRequestException('Address not found');
    }

    if (user[addressKey][addressIndex].isDefault) {
      throw new BadRequestException('Cannot delete default address');
    }

    user[addressKey].splice(addressIndex, 1);
    await user.save();
    return { message: 'The address has been successfully deleted.' };
  }

  async getAddressData(userId: string | undefined) {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    const addressData = this.userModel
      .findById(userId, { userAddress: 1, billingAddress: 1, _id: 0 })
      .exec();
    return addressData;
  }
}
