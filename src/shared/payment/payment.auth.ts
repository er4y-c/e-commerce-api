import * as CryptoJS from 'crypto-js';
import config from 'src/common/config';

export class PaymentAuthorization {
  private randomKey: string;
  private hashPayload: string = '';
  private encryptedData: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse('');
  private authorizationString: string = '';
  public requestData: unknown;
  public requestPath: string;

  public constructor(requestData: unknown, requestPath: string) {
    this.requestPath = requestPath;
    this.requestData = requestData;
    this.randomKey = new Date().getTime() + '123456789';
  }

  public get _randomKey(): string {
    return this.randomKey;
  }

  public withPayload(): PaymentAuthorization {
    const payload = this.requestData
      ? this.randomKey + this.requestPath + JSON.stringify(this.requestData)
      : this.randomKey + this.requestPath;
    this.hashPayload = payload;
    return this;
  }

  public withEncryptedData(): PaymentAuthorization {
    const secretKey = config().iyzico_secret_key as string;
    this.encryptedData = CryptoJS.HmacSHA256(this.hashPayload, secretKey);
    return this;
  }

  public withAuthorizationString(): PaymentAuthorization {
    const apiKey = config().iyzico_api_key;
    const signature = CryptoJS.enc.Base64.stringify(this.encryptedData);
    this.authorizationString = `apiKey:${apiKey}&randomKey:${this.randomKey}&signature:${signature}`;
    return this;
  }

  public generateEncodedAuthorization(): string {
    const base64EncodedAuthorization = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(this.authorizationString),
    );
    return `IYZWSv2 ${base64EncodedAuthorization}`;
  }
}
