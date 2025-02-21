import { Controller, Body, Post, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { ReqUser } from 'src/common/decorators/requser.decorator';
import { OrderService } from './order.service';
import { BinCheckDto, InstallmentCheckDto, InitOrderDto } from './dto';

@ApiTags('order')
@ApiBearerAuth()
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Check the bin number' })
  @ApiBody({ type: BinCheckDto })
  @ApiResponse({ status: 200, description: 'Bin check response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('bin')
  binCheck(@Body() binCheckDto: BinCheckDto) {
    return this.orderService.binCheck(binCheckDto);
  }

  @ApiOperation({ summary: 'Check the installment' })
  @ApiBody({ type: InstallmentCheckDto })
  @ApiResponse({ status: 200, description: 'Installment check response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('installment')
  installmentCheck(@Body() installmentCheckDto: InstallmentCheckDto) {
    return this.orderService.installmentCheck(installmentCheckDto);
  }

  @ApiOperation({ summary: 'Initialize the payment' })
  @ApiBody({ type: InitOrderDto })
  @ApiResponse({ status: 200, description: 'Payment initialization response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('initialize')
  initPayment(
    @ReqUser() userInfo: Request['user'],
    @Body() initOrderDto: InitOrderDto,
  ) {
    return this.orderService.initPayment(initOrderDto, userInfo);
  }

  @ApiOperation({ summary: 'Complete the payment' })
  @ApiResponse({ status: 200, description: 'Payment completion response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', type: 'string' })
  @Post('auth/:id')
  authPayment(@Param('id') id: string, @ReqUser('_id') userId: string) {
    return this.orderService.authPayment(id, userId);
  }
}
