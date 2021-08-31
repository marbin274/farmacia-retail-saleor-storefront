import gql from 'graphql-tag';

export const checkoutPriceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
      culture
    }
    net {
      amount
      currency
      culture
    }
  }
`;

export const checkoutAddressFragment = gql`
  fragment Address on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
    latitude
    longitude
    alias
  }
`;

export const checkoutProductVariantFragment = gql`
  ${checkoutPriceFragment}
  fragment ProductVariant on ProductVariant {
    id
    name
    sku
    quantityAvailable(district: $districtId)
    isAvailable
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
      }
      values {
        id
        name
        value: name
      }
    }
    product {
      id
      name
      category {
        id
        name
      }
      attributes {
        attribute {
          id
          name
        }
        values {
          id
          name
          value: name
        }
      }
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
      productType {
        isShippingRequired
      }
    }
  }
`;

export const checkoutShippingMethodFragment = gql`
  fragment ShippingMethod on ShippingMethod {
    id
    methodType {
      code
    }
    name
    price {
      currency
      amount
      culture
    }
    scheduleDates {
      date
      scheduleTimes {
        id
        startTime
        endTime
      }
    }
    subtitle
  }
`;

export const checkoutLineFragment = gql`
  ${checkoutPriceFragment}
  ${checkoutProductVariantFragment}
  fragment CheckoutLine on CheckoutLine {
    id
    quantity
    totalPrice {
      ...Price
    }
    variant {
      ...ProductVariant
    }
  }
`;

export const slotFragment = gql`
  fragment ShippingSlot on ShippingSlot {
    id
    slotFrom
    slotTo
  }
`;

export const checkoutFragment = gql`
  ${checkoutLineFragment}
  ${checkoutAddressFragment}
  ${checkoutPriceFragment}
  ${checkoutShippingMethodFragment}
  ${slotFragment}
  fragment Checkout on Checkout {
    token
    id
    scheduleDate {
      id
      date
      scheduleTime {
        id
        startTime
        endTime
      }
    }
    totalPrice {
      ...Price
    }
    subtotalPrice {
      ...Price
    }
    billingAddress {
      ...Address
    }
    shippingAddress {
      ...Address
    }
    email
    availableShippingMethods {
      ...ShippingMethod
    }
    shippingMethod {
      ...ShippingMethod
    }
    shippingPrice {
      ...Price
    }
    lines {
      ...CheckoutLine
    }
    isShippingRequired
    discount {
      currency
      amount
      culture
    }
    discountName
    translatedDiscountName
    voucherCode
    voucherType
    voucherDiscountType
    voucherDiscountValue
    documentNumber
    termsAndConditions
    dataTreatmentPolicy
    slots {
      scheduled {
        ...ShippingSlot
      }
      express {
        ...ShippingSlot
      }
      datetime
    }
    slotId
    deliveryDate
  }
`;
