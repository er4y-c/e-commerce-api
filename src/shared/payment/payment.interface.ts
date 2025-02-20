export enum PaymentLocales {
  TR = 'tr',
  EN = 'en',
}

export enum BinSearchStatus {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum CardType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PREPAID_CARD = 'PREPAID_CARD',
}

export enum CardAssociation {
  TROY = 'TROY',
  VISA = 'VISA',
  MASTER_CARD = 'MASTER_CARD',
  AMERICAN_EXPRESS = 'AMERICAN_EXPRESS',
}

export enum CardFamily {
  BONUS = 'Bonus',
  AXESS = 'Axess',
  WORLD = 'World',
  MAXIMUM = 'Maximum',
  PARAF = 'Paraf',
  CARDFINANS = 'CardFinans',
  ADVANTAGE = 'Advantage',
}

export enum BinCommercial {
  NO = 0,
  YES = 1,
}

export enum PaymentGroup {
  PRODUCT = 'PRODUCT',
  LISTING = 'LISTING',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum PaymentChannel {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  MOBILE_WEB = 'MOBILE_WEB',
  MOBILE_IOS = 'MOBILE_IOS',
  MOBILE_ANDROID = 'MOBILE_ANDROID',
  MOBILE_WINDOWS = 'MOBILE_WINDOWS',
  MOBILE_TABLET = 'MOBILE_TABLET',
  MOBILE_PHONE = 'MOBILE_PHONE',
}

export enum SupportedCurrencies {
  TRY = 'TRY',
  USD = 'USD',
  EUR = 'EUR',
}

export enum PaymentStatus {
  INITIALIZED = 'initialized',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface IBinData {
  binNumber: string; // Kartın ilk 6 hanesidir.
  cardType: CardType; // Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu tipi. Geçerli değerler: CREDIT_CARD, DEBIT_CARD, PREPAID_CARD
  cardAssociation: CardAssociation; // Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu kuruluş. Geçerli değerler: TROY, VISA, MASTER_CARD, AMERICAN_EXPRESS
  cardFamily: CardFamily; // Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu aile. Geçerli değerler: Bonus, Axess, World, Maximum, Paraf, CardFinans, Advantage
  bankName: string; // Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu banka adı.
  bankCode: number; // Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu banka kodu.
  commercial: BinCommercial; // Kartın ticari kart olup olmadığını belirtir. Değer 1 ise ticari karttır, 0 ise değildir.
  status: BinSearchStatus; // Yapılan isteğin sonucunu bildirir. İşlem başarılı ise success, hatalı ise failure döner.
  locale: PaymentLocales; // İstekte belirtilen locale değeri geri dönülür, varsayılan değeri trdir.
  systemTime: number; // Dönen sonucun o anki unix timestamp değeridir.
  conversationId: string; // İstek esnasında gönderilmişse, sonuçta aynen geri iletilir.
}

export interface ICardData {
  cardHolderName: string; // Kart sahibinin adı soyadı
  cvc: string; // 4 (AMEX) or 3 (VISA, MC, TROY) digits card verification code
  expireMonth: string; // Kartın son kullanma ayı
  expireYear: string; // Kartın son kullanma yılı
  cardNumber: string; // 15 (AMEX) or 16 (VISA, MC) digits card number
}

export interface IPaymentDetails {
  locale: PaymentLocales; // Locale (default: tr). Alternatively, you can set en
  paymentGroup: PaymentGroup; // Payment group (default: PRODUCT). Valid values are PRODUCT, LISTING, SUBSCRIPTION
  paymentChannel: PaymentChannel; // Payment channel. Valid values are WEB, MOBILE, MOBILE_WEB, MOBILE_IOS, MOBILE_ANDROID, MOBILE_WINDOWS, MOBILE_TABLET, MOBILE_PHONE
  callbackUrl: string; // Redirection URL after payment
  currency: SupportedCurrencies; // Currency (default: TRY). Alternatively, you can set USD, EUR, GBP and IRR
  appointmentId: string; // ID of appointment
  consultantId: string; // ID of consultant
  clientId: string; // ID of client
}

export interface ItemTransaction {
  paymentTransactionId: string; // Unique ID for the transaction
  itemId: string; // ID for the item in the basket
  price: number; // Item price
  paidPrice: number; // Paid amount for the item
  transactionStatus: -1 | 0 | 1 | 2; // Transaction status
  blockageRate?: number; // Blockage rate for this transaction
  blockageRateAmountMerchant?: number; // Blockage amount for merchant
  blockageResolvedDate?: string; // Format: yyyy-MM-dd HH:mm:ss
  iyziCommissionFee?: number; // Fee for this transaction
  iyziCommissionRateAmount?: number; // Commission for this transaction
  merchantCommissionRate?: number; // Merchant's rate for this transaction
  merchantCommissionRateAmount?: number; // Merchant's amount for this transaction
  merchantPayoutAmount?: number; // Amount payable to merchant
  convertedPayout?: ConvertedPayout; // Converted payout information
}

export interface ConvertedPayout {
  paidPrice: number; // Converted paid price
  iyziCommissionFee?: number; // Converted commission fee
  iyziCommissionRateAmount?: number; // Converted commission amount
  blockageRateAmountMerchant?: number; // Converted blockage amount
  merchantPayoutAmount?: number; // Final merchant payout amount
  iyziConversationRate?: number; // Conversion rate
  iyziConversationRateAmount?: number; // Conversion rate amount
  currency: string; // Currency of converted payout
}

export interface ITransactionResults {
  paymentTransactionId?: string; // Banka veya ödeme sağlayıcısı tarafından verilen işlem ID'si
  failureReason?: string; // Başarısız ödeme durumunda hata nedeni
  iyziCommissionFee?: number; // Iyzico komisyon ücreti
  iyziCommissionRateAmount?: number; // Iyzico komisyon oranı
}

export interface IBillingMetadata {
  contactName: string;
  price: number;
  paidPrice: number;
  billingAddress: string;
  billingCountry: string;
  billingCity: string;
}
