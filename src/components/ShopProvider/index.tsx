import * as React from "react";

import { maybe } from "../../core/utils";
import { defaultContext, ShopContext } from "./context";

import { useShopDetails } from "@sdk/react";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";

const ShopProvider: React.FC = ({ children }) => {
  const { data } = useShopDetails();
  const [district, setDistrict] = useDistrictSelected();

  React.useEffect(() => {
    const districtDefault = data?.shop?.availableDistricts?.find(it => !!it.isDefault);
    if (districtDefault && !district.code) {
      setDistrict({ code: districtDefault.id, description: districtDefault.name });
    }
  }, [data]);

  return (
    <ShopContext.Provider value={maybe(() => (
      {
        ...data.shop, 
        availableDistricts: data.shop.availableDistricts?.filter(it => !!it.isActive),
      }
    ), defaultContext)}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
