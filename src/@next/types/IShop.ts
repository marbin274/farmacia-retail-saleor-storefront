export interface IShop {
  name?: string;
  description?: string;

  currencies?: string[];
  defaultCurrency?: string;
  includeTaxesInPrices?: boolean;
  displayGrossPrices?: boolean;
  chargeTaxesOnShipping?: boolean;
  trackInventoryByDefault?: boolean;
  defaultMailSenderName?: string;
  defaultMailSenderAddress?: string;
  defaultDigitalMaxDownloads?: number;
  defaultDigitalUrlValidDays?: number;
  automaticFulfillmentDigitalProducts?: boolean;
  customerSetPasswordUrl?: string;
  phonePrefixes?: string[];
  headerText?: string;

  // todo implement complete data interfaces system
  // availablePaymentGateways?: [PaymentGateway!]!;
  // geolocalization?: Geolocalization;
  // authorizationKeys?: [AuthorizationKey]!;
  // countries(...)?: [CountryDisplay!]!;
  // defaultCountry?: CountryDisplay;
  // domain?: Domain!;
  // homepageCollection?: Collection;
  // languages?: [LanguageDisplay]!;
  // navigation?: Navigation;
  // permissions?: [Permission]!;
  // defaultWeightUnit?: WeightUnitsEnum;
  // translation(...)?: ShopTranslation;
  // automaticFulfillmentDigitalProducts?: Boolean;
  // companyAddress?: Address;
  // staffNotificationRecipients?: [StaffNotificationRecipient];
}
