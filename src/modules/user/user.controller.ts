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

  @ApiOperation({ summary: 'Add shipping address to user' })
  @ApiBody({ type: ShippingAddressDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The address has been successfully added.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
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
  @Post('shipping')
  @HttpCode(HttpStatus.CREATED)
  addShippingAddress(
    @Req() req: Request,
    @Body() shippingAddressDto: ShippingAddressDto,
  ) {
    const userId = req.user?._id;
    return this.userService.addShippingAddress(userId, shippingAddressDto);
  }

  @ApiOperation({ summary: 'Add billing address to user' })
  @ApiBody({ type: BillingAddressDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The address has been successfully added.',
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
  @Post('billing')
  @HttpCode(HttpStatus.CREATED)
  addBillingAddress(
    @Req() req: Request,
    @Body() billingAddressDto: BillingAddressDto,
  ) {
    const userId = req.user?._id;
    return this.userService.addBillingAddress(userId, billingAddressDto);
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

  @ApiOperation({ summary: 'Update default shipping address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Default shipping address updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Address not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Patch('shipping/default/:addressId')
  @HttpCode(HttpStatus.OK)
  updateDefaultShippingAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
  ) {
    const userId = req.user?._id;
    return this.userService.updateDefaultShippingAddress(userId, addressId);
  }

  @ApiOperation({ summary: 'Update default shipping address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Default shipping address updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Address not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Patch('billing/default/:addressId')
  @HttpCode(HttpStatus.OK)
  updateDefaultBillingAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
  ) {
    const userId = req.user?._id;
    return this.userService.updateDefaultBillingAddress(userId, addressId);
  }

  @ApiOperation({ summary: 'Update shipping address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The address has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Address not found.',
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
  @Put('shipping/update/:addressId')
  @HttpCode(HttpStatus.OK)
  updateShippingAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
    @Body() shippingAddressDto: UpdateShippingAddressDto,
  ) {
    const userId = req.user?._id;
    return this.userService.updateShippingAddress(
      userId,
      addressId,
      shippingAddressDto,
    );
  }

  @ApiOperation({ summary: 'Update billing address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The address has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Address not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiBody({ type: UpdateBillingAddressDto })
  @Put('billing/update/:addressId')
  @HttpCode(HttpStatus.OK)
  updateBillingAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
    @Body() billingAddressDto: UpdateBillingAddressDto,
  ) {
    const userId = req.user?._id;
    return this.userService.updateBillingAddress(
      userId,
      addressId,
      billingAddressDto,
    );
  }

  @ApiOperation({ summary: 'Delete shipping address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The address has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot delete default address or address not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Delete('shipping/delete/:addressId')
  @HttpCode(HttpStatus.OK)
  deleteShippingAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
  ) {
    const userId = req.user?._id;
    return this.userService.deleteShippingAddress(userId, addressId);
  }

  @ApiOperation({ summary: 'Delete billing address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The address has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot delete default address or address not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Delete('billing/delete/:addressId')
  @HttpCode(HttpStatus.OK)
  deleteBillingAddress(
    @Req() req: Request,
    @Param('addressId') addressId: string,
  ) {
    const userId = req.user?._id;
    return this.userService.deleteBillingAddress(userId, addressId);
  }
}
