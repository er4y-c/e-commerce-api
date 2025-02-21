import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';

import config from 'src/common/config';
import { Orders, OrderDocument } from './order.schema';
import { Basket, BasketDocument } from '../basket/basket.schema';
import { Products, ProductDocument } from '../product/product.schema';
import { BinCheckResponse, InstallmentCheckResponse } from 'src/shared/payment';
import { PaymentHandler } from 'src/shared/payment/payment.handler';
import { BinCheckDto, InstallmentCheckDto, InitOrderDto } from './dto';
import { PaymentInitiliazeResponse } from 'src/shared/payment';

@Injectable()
export class OrderService {
  private callbackUrl = config().iyzico_callback_url;
  constructor(
    @InjectModel(Orders.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,
    @InjectModel(Products.name) private productModel: Model<ProductDocument>,
  ) {}

  async calculateTotalPrice(basketId: string): Promise<number> {
    const basket = await this.basketModel
      .findById(basketId)
      .populate('items.productId');
    if (!basket) {
      throw new Error('Basket not found');
    }

    const totalPrice = await Promise.all(
      basket.items.map(async (item) => {
        const product = await this.productModel.findById(item.productId);
        if (!product) {
          throw new Error(
            `Product with id ${item.productId.toString()} not found`,
          );
        }
        return product.price * item.quantity;
      }),
    ).then((prices) => prices.reduce((total, price) => total + price, 0));

    return totalPrice;
  }

  async binCheck(binCheckDto: BinCheckDto) {
    const { binNumber, locale, conversationId } = binCheckDto;
    const paymentHandler = new PaymentHandler(
      { binNumber, locale, conversationId },
      '/payment/bin/check',
    );
    const data = (await paymentHandler.send()) as BinCheckResponse;
    if (data.status !== 'success') {
      throw new BadRequestException(data.errorMessage);
    }
    return data;
  }

  async installmentCheck(installmentCheckDto: InstallmentCheckDto) {
    const { binNumber, price, conversationId, locale } = installmentCheckDto;
    const paymentHandler = new PaymentHandler(
      { binNumber, price, conversationId, locale },
      '/payment/iyzipos/installment',
    );
    const data = (await paymentHandler.send()) as InstallmentCheckResponse;
    if (data.status !== 'success') {
      throw new BadRequestException(data.errorMessage);
    }
    return data;
  }

  async initPayment(initOrderDto: InitOrderDto, userInfo: Request['user']) {
    const basket = await this.basketModel
      .findOne({ _id: initOrderDto.basketId })
      .populate('items.productId');

    if (!basket) {
      throw new BadRequestException('Basket not found');
    }

    const paymentDetails = {
      locale: initOrderDto.locale,
      paymentGroup: 'PRODUCT',
      paymentChannel: 'WEB',
      callbackUrl: 'https://your-callback-url.com',
      currency: initOrderDto.currency,
      appointmentId: 'appointment-id',
      consultantId: 'consultant-id',
      clientId: userInfo?._id,
    };
    const userAddress = userInfo?.userAddress.find(
      (address) => address.isDefault,
    );
    const billingAddress = userInfo?.billingAddress.find(
      (address) => address.isDefault,
    );
    const buyer = {
      id: userInfo?._id,
      name: userInfo?.name,
      surname: userInfo?.surname,
      email: userInfo?.email,
      identityNumber: userInfo?.identityNumber,
      registrationAddress: userAddress?.address,
      city: userAddress?.city,
      country: userAddress?.country,
      zipCode: userAddress?.zipCode,
    };

    const paymentHandler = new PaymentHandler(
      {
        locale: initOrderDto.locale,
        conversationId: initOrderDto.conversationId,
        price: this.calculateTotalPrice(initOrderDto.basketId),
        paidPrice: this.calculateTotalPrice(initOrderDto.basketId),
        basketId: initOrderDto.basketId,
        paymentCard: initOrderDto.paymentCard,
        buyer,
        paymentDetails,
        installments: initOrderDto.installments,
        shippingAddress: userAddress,
        billingAddress,
        callbackUrl: this.callbackUrl,
      },
      '/payment/iyzipos/initialize',
    );

    const paymentResponse =
      (await paymentHandler.send()) as PaymentInitiliazeResponse;
    if (paymentResponse.status !== 'success') {
      throw new BadRequestException(paymentResponse.errorMessage);
    }
    void this.orderModel.create({
      basketId: initOrderDto.basketId,
      paymentStatus: 'PENDING',
      paymentAmount: this.calculateTotalPrice(initOrderDto.basketId),
      paymentCurrency: initOrderDto.currency,
      paymentId: paymentResponse.paymentId,
      paymentDate: new Date(),
    });
    return paymentResponse;
  }
}
