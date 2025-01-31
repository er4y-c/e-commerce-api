import {
  Controller,
  Post,
  Get,
  Patch,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Req,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';

import { UserService } from './user.service';
import {
  ShippingAddressDto,
  BillingAddressDto,
  UpdateShippingAddressDto,
  UpdateBillingAddressDto,
} from './dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Add address to user' })
  @ApiBody({ type: ShippingAddressDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The address has been successfully added',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid address key',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Default address already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post(':addressKey')
  @HttpCode(HttpStatus.CREATED)
  addAddress(
    @Req() req: Request,
    @Body() addressDto: ShippingAddressDto | BillingAddressDto,
    @Param('addressKey') addressKey: 'userAddress' | 'billingAddress',
  ) {
    const userId = req.user?._id;
    return this.userService.addAddress(userId, addressDto, addressKey);
  }

  @ApiOperation({ summary: 'Get user address data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User address data.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get('address')
  @HttpCode(HttpStatus.OK)
  getAddressData(@Req() req: Request) {
    const userId = req.user?._id;
    return this.userService.getAddressData(userId);
  }

  @ApiOperation({ summary: 'Update default address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Default address updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Address not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid address key.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Patch(':addressKey/default/:addressId')
  @HttpCode(HttpStatus.OK)
  updateDefaultAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
    @Param('addressKey') addressKey: 'userAddress' | 'billingAddress',
  ) {
    const userId = req.user?._id;
    return this.userService.updateDefaultAddress(userId, addressId, addressKey);
  }

  @ApiOperation({ summary: 'Update address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The address has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Address not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid address key.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiBody({ type: UpdateShippingAddressDto })
  @Put(':addressKey/update/:addressId')
  @HttpCode(HttpStatus.OK)
  updateAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
    @Body() addressDto: UpdateShippingAddressDto | UpdateBillingAddressDto,
    @Param('addressKey') addressKey: 'userAddress' | 'billingAddress',
  ) {
    const userId = req.user?._id;
    return this.userService.updateAddress(
      userId,
      addressId,
      addressDto,
      addressKey,
    );
  }

  @ApiOperation({ summary: 'Delete address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The address has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot delete default address or address not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid address key.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Delete(':addressKey/delete/:addressId')
  @HttpCode(HttpStatus.OK)
  deleteAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
    @Param('addressKey') addressKey: 'userAddress' | 'billingAddress',
  ) {
    const userId = req.user?._id;
    return this.userService.deleteAddress(userId, addressId, addressKey);
  }
}
