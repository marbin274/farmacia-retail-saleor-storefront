import { IAddressForm } from '@temp/@next/types/IAddressForm';
import { ICheckout } from '@temp/@sdk/api/Checkout/types';
import {
  UserDetails_me,
  UserDetails_me_addresses,
  UserDetails_me_cardTokens,
} from '@temp/@sdk/queries/gqlTypes/UserDetails';

export const countries = [
  { code: 'PL', country: 'Poland' },
  { code: 'PT', country: 'Portugal' },
  { code: 'US', country: 'United States of America' },
  { code: 'DE', country: 'Germany' },
  { code: 'BE', country: 'Belarus' },
  { code: 'SE', country: 'Sweden' },
  { code: 'FR', country: 'France' },
  { code: 'CZ', country: 'Czech Republic' },
  { code: 'FI', country: 'Finland' },
  { code: 'GB', country: 'Great Britain' },
];

export const address: IAddressForm = {
  dataTreatmentPolicy: false,
  district: 'RGlzdHJpY3Q6OQ==',
  documentNumber: '46734897',
  isLastMileActive: false,
  isScheduled: false,
  email: 'abc@xyz.com',
  firstName: 'John',
  latitude: 0,
  longitude: 0,
  phone: '+51952452125',
  streetAddress1: 'Street line 1',
  streetAddress2: 'Street line 2',
  termsAndConditions: true,
};

export const checkoutData: ICheckout = {
  id: 'Q2hlY2tvdXQ6MmRkZTZhMjMtMzJiZS00NjAxLTg0MWQtMDU5N2RmMTdkNWVk',
  documentNumber: '4527856',
  email: address.email,
  shippingAddress: {
    ...address,
    district: {
      id: 'RGlzdHJpY3Q6OQ==',
      name: 'Miraflores',
    },
  },
  token: '',
};

export const userAddressItem: UserDetails_me_addresses = {
  __typename: 'Address',
  city: '',
  district: {
    __typename: 'District',
    id: 'RGlzdHJpY3Q6OQ==',
    name: 'Miraflores',
  },
  companyName: '',
  country: { __typename: 'CountryDisplay', code: '', country: '' },
  countryArea: '',
  firstName: 'Rocio',
  id: '',
  isDefaultBillingAddress: null,
  isDefaultShippingAddress: null,
  lastName: 'Perez',
  latitude: -12.046373,
  longitude: -77.042755,
  phone: '+519854124511',
  postalCode: '',
  streetAddress1: 'Calle las palmeras',
  streetAddress2: 'Paradero óvalo',
  alias: 'My home',
};

export const userCardTokenItem: UserDetails_me_cardTokens = {
  __typename: 'CardToken',
  binNumber: '1234',
  brand: 'visa',
  cardNumber: '5678********3455',
  default: false,
  email: 'lalo@email.com',
  firstName: 'Lalo',
  id: 'id',
  lastName: 'Landa',
};

export const userAddress: UserDetails_me = {
  __typename: 'User',
  addresses: [userAddressItem],
  cardTokens: [userCardTokenItem],
  dataTreatmentPolicy: false,
  defaultBillingAddress: null,
  defaultShippingAddress: userAddressItem,
  documentNumber: '85475126',
  email: 'abcd@www.com',
  favoriteCategories: [],
  firstName: 'Paola',
  id: '',
  isStaff: false,
  lastName: 'Rodriguez',
  termsAndConditions: true,
};

export const documentNumber = '12345678';
export const wrongDocumentNumber = ' 12345678';

export const errors = [
  {
    field: 'firstName',
    message: 'This is an error',
  },
];
