import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Orders, OrderDocument } from './order.schema';
import { PaymentHandler } from 'src/shared/payment';
import { BinCheckDto, InstallmentCheckDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name) private orderModel: Model<OrderDocument>,
  ) {}

  binCheck(binCheckDto: BinCheckDto) {
    const { binNumber, locale, conversationId } = binCheckDto;
    const paymentHandler = new PaymentHandler(
      { binNumber, locale, conversationId },
      '/payment/bin/check',
    );
    return paymentHandler.send();
  }

  installmentCheck(installmentCheckDto: InstallmentCheckDto) {
    const { binNumber, price, conversationId, locale } = installmentCheckDto;
    const paymentHandler = new PaymentHandler(
      { binNumber, price, conversationId, locale },
      '/payment/iyzipos/installment',
    );
    return paymentHandler.send();
  }
}
