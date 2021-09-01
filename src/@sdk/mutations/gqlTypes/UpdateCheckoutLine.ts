/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutLineInput, CheckoutErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCheckoutLine
// ====================================================

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_scheduleDate_scheduleTime {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_scheduleDate {
  __typename: "ScheduleDate";
  /**
   * The ID of the object.
   */
  id: string;
  date: any;
  scheduleTime: UpdateCheckoutLine_checkoutLinesUpdate_checkout_scheduleDate_scheduleTime;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress_country {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress {
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
  country: UpdateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress_country;
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress_country {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress {
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
  country: UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress_country;
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_price {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_scheduleDates_scheduleTimes | null)[] | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods {
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
  price: UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_scheduleDates_scheduleTimes | null)[] | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod {
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
  price: UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_attribute {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_values {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_values | null)[];
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_attributes_attribute {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_attributes_values {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_attributes_values | null)[];
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_category | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_attributes[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x | null;
  /**
   * Product type
   */
  productType: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_productType | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant {
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
  pricing: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes[];
  product: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_discount {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_slots_scheduled {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_slots_express {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout_slots {
  __typename: "Slot";
  /**
   * List of scheduled slots.
   */
  scheduled: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_slots_scheduled | null)[] | null;
  /**
   * List of express slots.
   */
  express: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_slots_express | null)[] | null;
  /**
   * Datetime.
   */
  datetime: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkout {
  __typename: "Checkout";
  token: any;
  /**
   * The ID of the object.
   */
  id: string;
  scheduleDate: UpdateCheckoutLine_checkoutLinesUpdate_checkout_scheduleDate | null;
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice | null;
  billingAddress: UpdateCheckoutLine_checkoutLinesUpdate_checkout_billingAddress | null;
  shippingAddress: UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingAddress | null;
  /**
   * Email of a customer.
   */
  email: string;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods | null)[];
  shippingMethod: UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod | null;
  /**
   * The price of the shipping, with all the taxes included.
   */
  shippingPrice: UpdateCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (UpdateCheckoutLine_checkoutLinesUpdate_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  discount: UpdateCheckoutLine_checkoutLinesUpdate_checkout_discount | null;
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
  slots: UpdateCheckoutLine_checkoutLinesUpdate_checkout_slots | null;
  /**
   * Slot id.
   */
  slotId: string | null;
  /**
   * Slot date.
   */
  deliveryDate: string | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_errors {
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

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkoutErrors_products {
  __typename: "FailedProduct";
  /**
   * Product variant SKU which causes error.
   */
  sku: string | null;
  /**
   * Stock available 
   */
  quantityAvailable: number | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate_checkoutErrors {
  __typename: "CheckoutError";
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
  code: CheckoutErrorCode;
  /**
   * List of products that produce errors.
   */
  products: (UpdateCheckoutLine_checkoutLinesUpdate_checkoutErrors_products | null)[] | null;
}

export interface UpdateCheckoutLine_checkoutLinesUpdate {
  __typename: "CheckoutLinesUpdate";
  /**
   * An updated checkout.
   */
  checkout: UpdateCheckoutLine_checkoutLinesUpdate_checkout | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: UpdateCheckoutLine_checkoutLinesUpdate_errors[];
  checkoutErrors: UpdateCheckoutLine_checkoutLinesUpdate_checkoutErrors[];
}

export interface UpdateCheckoutLine {
  /**
   * Updates checkout line in the existing checkout.
   */
  checkoutLinesUpdate: UpdateCheckoutLine_checkoutLinesUpdate | null;
}

export interface UpdateCheckoutLineVariables {
  checkoutId: string;
  lines: (CheckoutLineInput | null)[];
  districtId?: string | null;
}
