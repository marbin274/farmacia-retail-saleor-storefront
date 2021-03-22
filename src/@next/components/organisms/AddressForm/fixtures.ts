import { UserDetails_me, UserDetails_me_addresses } from "@temp/@sdk/queries/gqlTypes/UserDetails";

export const countries = [
  { code: "PL", country: "Poland" },
  { code: "PT", country: "Portugal" },
  { code: "US", country: "United States of America" },
  { code: "DE", country: "Germany" },
  { code: "BE", country: "Belarus" },
  { code: "SE", country: "Sweden" },
  { code: "FR", country: "France" },
  { code: "CZ", country: "Czech Republic" },
  { code: "FI", country: "Finland" },
  { code: "GB", country: "Great Britain" },
];

export const address = {
  city: "Lima",
  companyName: "Mirumee",
  country: {
    code: "US",
    country: "United States of America",
  },
  countryArea: "NY",
  email: "abc@xyz.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+51952452125",
  postalCode: "90210",
  streetAddress1: "Street line 1",
  streetAddress2: "Street line 2",
};

export const checkoutData={
  documentNumber: "4527856",
  email: address.email,
  shippingAddress: {
    ...address,
  },
  token: "",
}

export const userAddressItem: UserDetails_me_addresses = {
  __typename: "Address",
  city: "",
  companyName: "",
  country: { __typename: "CountryDisplay", code: "", country: "" },
  countryArea: "",
  firstName: "Rocio",
  id: "",
  isDefaultBillingAddress: null,
  isDefaultShippingAddress: null,
  lastName: "Perez",
  phone: "+519854124511",
  postalCode: "",
  streetAddress1: "Calle las palmeras",
  streetAddress2: "Paradero óvalo",
}

export const userAddress: UserDetails_me = {
  __typename:"User",
  addresses: [userAddressItem],
  dataTreatmentPolicy: false,
  defaultBillingAddress:null,
  defaultShippingAddress: null,
  documentNumber: "85475126",
  email: "abcd@www.com",
  firstName: "Paola",
  id:"",
  isStaff:false,
  lastName: "Rodriguez",
  phone: "+51985475361",
  termsAndConditions: true,
}

export const documentNumber = "12345678";
export const wrongDocumentNumber = " 12345678";

export const errors = [
  {
    field: "firstName",
    message: "This is an error",
  },
];
