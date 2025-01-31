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

  async addShippingAddress(
    userId: string | undefined,
    shippingAddressDto: ShippingAddressDto,
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (shippingAddressDto.isDefault) {
      const hasDefaultAddress = user.userAddress.some(
        (address) => address.isDefault,
      );
      if (hasDefaultAddress) {
        throw new BadRequestException(
          'Zaten bir varsayılan gönderim adresi mevcut',
        );
      }
    }

    user.userAddress.push({
      ...shippingAddressDto,
      _id: new Types.ObjectId(),
    });
    await user.save();
    return { message: 'The address has been successfully added.' };
  }

  async addBillingAddress(
    userId: string | undefined,
    billingAddressDto: BillingAddressDto,
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (billingAddressDto.isDefault) {
      const hasDefaultAddress = user.billingAddress.some(
        (address) => address.isDefault,
      );
      if (hasDefaultAddress) {
        throw new BadRequestException(
          'Zaten bir varsayılan fatura adresi mevcut',
        );
      }
    }

    user.billingAddress.push({
      ...billingAddressDto,
      _id: new Types.ObjectId(),
    });
    await user.save();
    return { message: 'The address has been successfully added.' };
  }

  async updateDefaultShippingAddress(
    userId: string | undefined,
    addressId: string,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user || !userId) {
      throw new UnauthorizedException('User not found');
    }

    user.userAddress.forEach((address) => {
      address.isDefault = false;
    });

    const address = user.userAddress.find(
      (addr) => addr._id.toString() === addressId,
    );
    if (!address) {
      throw new BadRequestException('Address not found');
    }
    address.isDefault = true;

    await user.save();
    return { message: 'Default shipping address has been updated.' };
  }

  async updateDefaultBillingAddress(
    userId: string | undefined,
    addressId: string,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user || !userId) {
      throw new UnauthorizedException('User not found');
    }

    user.billingAddress.forEach((address) => {
      address.isDefault = false;
    });

    const address = user.billingAddress.find(
      (addr) => addr._id.toString() === addressId,
    );
    if (!address) {
      throw new BadRequestException('Address not found');
    }
    address.isDefault = true;

    await user.save();
    return { message: 'Default billing address has been updated.' };
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

  async deleteShippingAddress(
    userId: string | undefined,
    addressId: string,
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const addressIndex = user.userAddress.findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      throw new BadRequestException('Address not found');
    }

    if (user.userAddress[addressIndex].isDefault) {
      throw new BadRequestException('Cannot delete default address');
    }

    user.userAddress.splice(addressIndex, 1);
    await user.save();
    return { message: 'The address has been successfully deleted.' };
  }

  async deleteBillingAddress(
    userId: string | undefined,
    addressId: string,
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const addressIndex = user.billingAddress.findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      throw new BadRequestException('Address not found');
    }

    if (user.billingAddress[addressIndex].isDefault) {
      throw new BadRequestException('Cannot delete default address');
    }

    user.billingAddress.splice(addressIndex, 1);
    await user.save();
    return { message: 'The address has been successfully deleted.' };
  }

  async updateShippingAddress(
    userId: string | undefined,
    addressId: string,
    shippingAddressDto: UpdateShippingAddressDto,
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const addressIndex = user.userAddress.findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      throw new BadRequestException('Address not found');
    }

    user.userAddress[addressIndex] = {
      ...user.userAddress[addressIndex],
      ...shippingAddressDto,
    };

    await user.save();
    return { message: 'The address has been successfully updated.' };
  }

  async updateBillingAddress(
    userId: string | undefined,
    addressId: string,
    billingAddressDto: UpdateBillingAddressDto,
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const addressIndex = user.billingAddress.findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      throw new BadRequestException('Address not found');
    }

    user.billingAddress[addressIndex] = {
      ...user.billingAddress[addressIndex],
      ...billingAddressDto,
    };

    await user.save();
    return { message: 'The address has been successfully updated.' };
  }
}
