/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput, ShippingMethodTypeCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCheckoutBillingAddressWithEmail
// ====================================================

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_errors {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_scheduleDate_scheduleTime {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_scheduleDate {
  __typename: "ScheduleDate";
  /**
   * The ID of the object.
   */
  id: string;
  date: any;
  scheduleTime: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_scheduleDate_scheduleTime;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_totalPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_totalPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_subtotalPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_subtotalPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_billingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_billingAddress_country {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_billingAddress {
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
  district: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_billingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_billingAddress_country;
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingAddress_country {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingAddress {
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
  district: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingAddress_country;
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_methodType {
  __typename: "ShippingMethodType";
  /**
   * The ID of the object.
   */
  id: string;
  code: ShippingMethodTypeCode;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_price {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_scheduleDates_scheduleTimes | null)[] | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  methodType: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_methodType | null;
  name: string;
  price: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  /**
   * Payment gateway ID.
   */
  id: string;
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availablePaymentGateways_config[];
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_methodType {
  __typename: "ShippingMethodType";
  /**
   * The ID of the object.
   */
  id: string;
  code: ShippingMethodTypeCode;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_price {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_scheduleDates_scheduleTimes | null)[] | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  methodType: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_methodType | null;
  name: string;
  price: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_totalPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_totalPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_attributes_attribute {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_attributes_values {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_attributes_values | null)[];
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_attributes_attribute {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_attributes_values {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_attributes_values | null)[];
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_category | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_attributes[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_thumbnail2x | null;
  /**
   * Product type
   */
  productType: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product_productType | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant {
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
  pricing: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_attributes[];
  product: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_discount {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_scheduled {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_express {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_nextDay {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_express30 {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots {
  __typename: "Slot";
  /**
   * List of scheduled slots.
   */
  scheduled: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_scheduled | null)[] | null;
  /**
   * List of express slots.
   */
  express: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_express | null)[] | null;
  /**
   * List of next_day slots.
   */
  nextDay: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_nextDay | null)[] | null;
  /**
   * List of express_30 slots.
   */
  express30: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots_express30 | null)[] | null;
  /**
   * Datetime.
   */
  datetime: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout {
  __typename: "Checkout";
  token: any;
  /**
   * The ID of the object.
   */
  id: string;
  scheduleDate: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_scheduleDate | null;
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_subtotalPrice | null;
  billingAddress: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_billingAddress | null;
  shippingAddress: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingAddress | null;
  /**
   * Email of a customer.
   */
  email: string;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availableShippingMethods | null)[];
  /**
   * List of available payment gateways.
   */
  availablePaymentGateways: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_availablePaymentGateways[];
  shippingMethod: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingMethod | null;
  /**
   * The price of the shipping, with all the taxes included.
   */
  shippingPrice: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_shippingPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  discount: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_discount | null;
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
  slots: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout_slots | null;
  /**
   * Slot id.
   */
  slotId: string | null;
  /**
   * Slot date.
   */
  deliveryDate: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate {
  __typename: "CheckoutBillingAddressUpdate";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_errors[];
  /**
   * An updated checkout.
   */
  checkout: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate_checkout | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_scheduleDate_scheduleTime {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_scheduleDate {
  __typename: "ScheduleDate";
  /**
   * The ID of the object.
   */
  id: string;
  date: any;
  scheduleTime: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_scheduleDate_scheduleTime;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_totalPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_totalPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_subtotalPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_subtotalPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_billingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_billingAddress_country {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_billingAddress {
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
  district: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_billingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_billingAddress_country;
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingAddress_country {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingAddress {
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
  district: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingAddress_country;
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_methodType {
  __typename: "ShippingMethodType";
  /**
   * The ID of the object.
   */
  id: string;
  code: ShippingMethodTypeCode;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_price {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_scheduleDates_scheduleTimes | null)[] | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  methodType: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_methodType | null;
  name: string;
  price: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  /**
   * Payment gateway ID.
   */
  id: string;
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availablePaymentGateways_config[];
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_methodType {
  __typename: "ShippingMethodType";
  /**
   * The ID of the object.
   */
  id: string;
  code: ShippingMethodTypeCode;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_price {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_scheduleDates_scheduleTimes | null)[] | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  methodType: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_methodType | null;
  name: string;
  price: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_totalPrice_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_totalPrice_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_price_gross {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_price_net {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_attributes_attribute {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_attributes_values {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_attributes_values | null)[];
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_attributes_attribute {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_attributes_values {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_attributes_values | null)[];
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_category | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_attributes[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_thumbnail2x | null;
  /**
   * Product type
   */
  productType: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product_productType | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant {
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
  pricing: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_attributes[];
  product: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_discount {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_scheduled {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_express {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_nextDay {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_express30 {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots {
  __typename: "Slot";
  /**
   * List of scheduled slots.
   */
  scheduled: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_scheduled | null)[] | null;
  /**
   * List of express slots.
   */
  express: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_express | null)[] | null;
  /**
   * List of next_day slots.
   */
  nextDay: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_nextDay | null)[] | null;
  /**
   * List of express_30 slots.
   */
  express30: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots_express30 | null)[] | null;
  /**
   * Datetime.
   */
  datetime: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout {
  __typename: "Checkout";
  token: any;
  /**
   * The ID of the object.
   */
  id: string;
  scheduleDate: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_scheduleDate | null;
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_subtotalPrice | null;
  billingAddress: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_billingAddress | null;
  shippingAddress: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingAddress | null;
  /**
   * Email of a customer.
   */
  email: string;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availableShippingMethods | null)[];
  /**
   * List of available payment gateways.
   */
  availablePaymentGateways: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_availablePaymentGateways[];
  shippingMethod: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingMethod | null;
  /**
   * The price of the shipping, with all the taxes included.
   */
  shippingPrice: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_shippingPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  discount: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_discount | null;
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
  slots: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout_slots | null;
  /**
   * Slot id.
   */
  slotId: string | null;
  /**
   * Slot date.
   */
  deliveryDate: string | null;
}

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_errors {
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

export interface UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate {
  __typename: "CheckoutEmailUpdate";
  /**
   * An updated checkout.
   */
  checkout: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_checkout | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate_errors[];
}

export interface UpdateCheckoutBillingAddressWithEmail {
  /**
   * Update billing address in the existing checkout.
   */
  checkoutBillingAddressUpdate: UpdateCheckoutBillingAddressWithEmail_checkoutBillingAddressUpdate | null;
  /**
   * Updates email address in the existing checkout object.
   */
  checkoutEmailUpdate: UpdateCheckoutBillingAddressWithEmail_checkoutEmailUpdate | null;
}

export interface UpdateCheckoutBillingAddressWithEmailVariables {
  checkoutId: string;
  billingAddress: AddressInput;
  email: string;
  districtId?: string | null;
}
