/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentInput, PaymentErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCheckoutPayment
// ====================================================

export interface CreateCheckoutPayment_checkoutPaymentCreate_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_scheduleDate_scheduleTime {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_scheduleDate {
  __typename: "ScheduleDate";
  /**
   * The ID of the object.
   */
  id: string;
  date: any;
  scheduleTime: CreateCheckoutPayment_checkoutPaymentCreate_checkout_scheduleDate_scheduleTime;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CreateCheckoutPayment_checkoutPaymentCreate_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: CreateCheckoutPayment_checkoutPaymentCreate_checkout_totalPrice_net;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_subtotalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_subtotalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CreateCheckoutPayment_checkoutPaymentCreate_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: CreateCheckoutPayment_checkoutPaymentCreate_checkout_subtotalPrice_net;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_billingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateCheckoutPayment_checkoutPaymentCreate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
  latitude: number | null;
  longitude: number | null;
  alias: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
  latitude: number | null;
  longitude: number | null;
  alias: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods_scheduleDates_scheduleTimes | null)[] | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Flag to recognize if this shipping method has schedules to select.
   */
  isScheduled: boolean | null;
  price: CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod_scheduleDates_scheduleTimes | null)[] | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Flag to recognize if this shipping method has schedules to select.
   */
  isScheduled: boolean | null;
  price: CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingPrice_net;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_totalPrice_net;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_price_net;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing_price | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_attributes_values | null)[];
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_attributes_values | null)[];
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_category | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_attributes[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_thumbnail2x | null;
  /**
   * Product type
   */
  productType: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product_productType | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_attributes[];
  product: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant_product;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_totalPrice | null;
  variant: CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines_variant;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_discount {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_slots_scheduled {
  __typename: "ShippingSlot";
  /**
   * Slot id.
   */
  id: string | null;
  /**
   * Slot available from.
   */
  slotFrom: string | null;
  /**
   * Slot available to.
   */
  slotTo: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_slots_express {
  __typename: "ShippingSlot";
  /**
   * Slot id.
   */
  id: string | null;
  /**
   * Slot available from.
   */
  slotFrom: string | null;
  /**
   * Slot available to.
   */
  slotTo: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout_slots {
  __typename: "Slot";
  /**
   * List of scheduled slots.
   */
  scheduled: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_slots_scheduled | null)[] | null;
  /**
   * List of express slots.
   */
  express: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_slots_express | null)[] | null;
  /**
   * Datetime.
   */
  datetime: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_checkout {
  __typename: "Checkout";
  token: any;
  /**
   * The ID of the object.
   */
  id: string;
  scheduleDate: CreateCheckoutPayment_checkoutPaymentCreate_checkout_scheduleDate | null;
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: CreateCheckoutPayment_checkoutPaymentCreate_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: CreateCheckoutPayment_checkoutPaymentCreate_checkout_subtotalPrice | null;
  billingAddress: CreateCheckoutPayment_checkoutPaymentCreate_checkout_billingAddress | null;
  shippingAddress: CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingAddress | null;
  /**
   * Email of a customer.
   */
  email: string;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_availableShippingMethods | null)[];
  shippingMethod: CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingMethod | null;
  /**
   * The price of the shipping, with all the taxes included.
   */
  shippingPrice: CreateCheckoutPayment_checkoutPaymentCreate_checkout_shippingPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (CreateCheckoutPayment_checkoutPaymentCreate_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  discount: CreateCheckoutPayment_checkoutPaymentCreate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  /**
   * Voucher code
   */
  voucherCode: string | null;
  /**
   * Voucher type
   */
  voucherType: string | null;
  /**
   * Voucher discount type
   */
  voucherDiscountType: string | null;
  /**
   * Voucher discount value
   */
  voucherDiscountValue: number | null;
  documentNumber: string | null;
  termsAndConditions: boolean;
  dataTreatmentPolicy: boolean;
  /**
   * List of slots.
   */
  slots: CreateCheckoutPayment_checkoutPaymentCreate_checkout_slots | null;
  /**
   * Slot id.
   */
  slotId: string | null;
  /**
   * Slot date.
   */
  deliveryDate: string | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_payment_creditCard {
  __typename: "CreditCard";
  /**
   * Card brand.
   */
  brand: string;
  /**
   * The host name of the domain.
   */
  firstDigits: string;
  /**
   * Last 4 digits of the card number.
   */
  lastDigits: string;
  /**
   * Two-digit number representing the card’s expiration month.
   */
  expMonth: number;
  /**
   * Four-digit number representing the card’s expiration year.
   */
  expYear: number;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_payment {
  __typename: "Payment";
  /**
   * The ID of the object.
   */
  id: string;
  gateway: string;
  token: string;
  /**
   * The details of the card used for this payment.
   */
  creditCard: CreateCheckoutPayment_checkoutPaymentCreate_payment_creditCard | null;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate_paymentErrors {
  __typename: "PaymentError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: PaymentErrorCode;
}

export interface CreateCheckoutPayment_checkoutPaymentCreate {
  __typename: "CheckoutPaymentCreate";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: CreateCheckoutPayment_checkoutPaymentCreate_errors[];
  /**
   * Related checkout object.
   */
  checkout: CreateCheckoutPayment_checkoutPaymentCreate_checkout | null;
  /**
   * A newly created payment.
   */
  payment: CreateCheckoutPayment_checkoutPaymentCreate_payment | null;
  paymentErrors: CreateCheckoutPayment_checkoutPaymentCreate_paymentErrors[];
}

export interface CreateCheckoutPayment {
  /**
   * Create a new payment for given checkout.
   */
  checkoutPaymentCreate: CreateCheckoutPayment_checkoutPaymentCreate | null;
}

export interface CreateCheckoutPaymentVariables {
  checkoutId: string;
  paymentInput: PaymentInput;
  districtId?: string | null;
}
