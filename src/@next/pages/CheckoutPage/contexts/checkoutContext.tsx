import React, { createContext, FC, useState } from 'react';

type ICheckoutContext = {
  shouldUnselectDistrict: boolean;
  setShouldUnselectDistrict: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CheckoutContext = createContext<ICheckoutContext>({
  shouldUnselectDistrict: false,
  setShouldUnselectDistrict: null,
});

export const CheckoutContextProvider: FC = ({ children }) => {
  const [shouldUnselectDistrict, setShouldUnselectDistrict] = useState(false);

  return (
    <CheckoutContext.Provider
      value={{ shouldUnselectDistrict, setShouldUnselectDistrict }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
