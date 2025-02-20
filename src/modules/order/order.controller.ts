import { Controller, Body, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { BasketService } from '../basket/basket.service';
import { BinCheckDto, InstallmentCheckDto } from './dto';

@ApiTags('order')
@ApiBearerAuth()
@Controller('api/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly basketService: BasketService,
  ) {}

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
}
