import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

import { BasketService } from './basket.service';
import { CheckStockDto } from './dto/check-stock.dto';

@ApiBearerAuth()
@ApiTags('basket')
@Controller('api/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'Check stock availability' })
  @ApiBody({ type: CheckStockDto })
  @ApiResponse({ status: 200, description: 'Stock available' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Insufficient stock' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('check')
  @HttpCode(HttpStatus.OK)
  async check(@Body() checkStockDto: CheckStockDto) {
    await this.basketService.checkStock(checkStockDto);
    return {
      message: 'Stock available',
    };
  }
}
