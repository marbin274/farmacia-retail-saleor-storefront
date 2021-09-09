import * as React from 'react';

import { maybe } from '@temp/core/utils';
import { defaultContext, ShopContext } from './context';

import { useShopDetails } from '@sdk/react';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';

const ShopProvider: React.FC = ({ children }) => {
  const { data } = useShopDetails();
  const [district, setDistrict] = useDistrictSelected();

  React.useEffect(() => {
    const districtDefault = data?.shop?.availableDistricts?.find(
      (it) => !!it.isDefault
    );
    if (districtDefault && !district.id) {
      setDistrict(districtDefault);
    }
  }, [data]);

  return (
    <ShopContext.Provider
      value={maybe(
        () => ({
          ...data.shop,
          availableDistricts: data.shop.availableDistricts?.filter(
            (it) => !!it.isActive
          ),
        }),
        defaultContext
      )}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
