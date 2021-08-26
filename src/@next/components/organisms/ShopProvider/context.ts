import { GetShop_shop } from '@temp/@sdk/queries/gqlTypes/GetShop';
import { createContext, useContext } from 'react';

export const defaultCountry = {
  __typename: 'CountryDisplay' as 'CountryDisplay',
  code: 'US',
  country: 'United States of America',
};

export const defaultContext: GetShop_shop = {
  __typename: 'Shop',
  availableDistricts: [],
  countries: [],
  defaultCountry,
  displayGrossPrices: true,
  geolocalization: { __typename: 'Geolocalization', country: defaultCountry },
  isShippingAvailable: true,
};

export const ShopContext = createContext<GetShop_shop>(defaultContext);
ShopContext.displayName = 'ShopContext';

export const useShopContext = (): GetShop_shop => {
  const context = useContext(ShopContext);
  return { ...context };
};
