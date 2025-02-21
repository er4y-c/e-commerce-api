import axios from 'axios';

import config from 'src/common/config';
import { PaymentAuthorization } from './payment.auth';

export class PaymentHandler {
  public requestUrl: string;
  public requestData: unknown;
  public authorizationHeader: string;
  private auth: PaymentAuthorization;

  public constructor(requestData: unknown, requestPath: string) {
    this.requestData = requestData;
    this.requestUrl = config().iyzico_api + requestPath;
    this.auth = new PaymentAuthorization(requestData, requestPath);
    this.authorizationHeader = this.auth
      .withPayload()
      .withEncryptedData()
      .withAuthorizationString()
      .generateEncodedAuthorization();
  }

  public send = async (): Promise<any> => {
    try {
      const res = await axios.post(this.requestUrl, this.requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authorizationHeader,
          'x-iyzi-rnd': this.auth._randomKey,
        },
      });
      return res.data;
    } catch {
      throw new Error('Payment request failed');
    }
  };
}
