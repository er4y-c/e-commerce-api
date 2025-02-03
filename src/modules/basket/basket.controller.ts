import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

import { BasketService } from './basket.service';
import { AddToBasketDto, UpdateBasketItemDto } from './dto';
import { ReqUser } from 'src/common/decorators/requser.decorator';
import { StockValidationPipe } from 'src/common/pipes/basket.pipe';

@ApiBearerAuth()
@ApiTags('basket')
@Controller('api/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: "Get user's basket details" })
  @ApiResponse({ status: 200, description: 'Return basket' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  getBasket(@ReqUser('_id') userId: string) {
    return this.basketService.getBasket(userId);
  }

  @ApiOperation({ summary: 'Add a product to basket' })
  @ApiBody({ type: AddToBasketDto })
  @ApiResponse({ status: 201, description: 'Product added to basket' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Insufficient stock' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  addToBasket(
    @ReqUser('_id') userId: string,
    @Body(StockValidationPipe) basketItem: AddToBasketDto,
  ) {
    return this.basketService.addToBasket(userId, basketItem);
  }

  @ApiOperation({ summary: 'Update basket item' })
  @ApiBody({ type: UpdateBasketItemDto })
  @ApiResponse({ status: 200, description: 'Basket item updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Insufficient stock' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('item')
  updateBasketItem(
    @ReqUser('_id') userId: string,
    @Body(StockValidationPipe) dto: UpdateBasketItemDto,
  ) {
    return this.basketService.updateBasketItem(userId, dto);
  }

  @ApiOperation({ summary: 'Clear the basket items' })
  @ApiResponse({ status: 200, description: 'Products removed from basket' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete()
  clearBasket(@ReqUser('_id') userId: string) {
    return this.basketService.clearBasket(userId);
  }
}
