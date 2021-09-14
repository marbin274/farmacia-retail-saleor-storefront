import { useContext } from 'react';
import { CheckoutContext } from '../contexts';

export const useCheckoutContext = () => {
  const { shouldUnselectDistrict, setShouldUnselectDistrict } =
    useContext(CheckoutContext);

  return {
    shouldUnselectDistrict,
    setShouldUnselectDistrict,
  };
};
