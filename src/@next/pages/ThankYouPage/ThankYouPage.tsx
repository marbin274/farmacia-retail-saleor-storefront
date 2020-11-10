import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ThankYou } from "@components/organisms";
import { BASE_URL } from "@temp/core/config";
import { generateGuestOrderDetailsUrl } from "@utils/core";
import { OverlayContext, OverlayContextInterface } from "@temp/components/Overlay/context";

import { IProps } from "./types";

const ThankYouPage: React.FC<IProps> = ({}: IProps) => {
  const location: Record<string, any> = useLocation();
  const history = useHistory();
  const overlay: OverlayContextInterface | undefined = useContext(OverlayContext);
  const { token, orderNumber } = location.state;
  return (
    <ThankYou
      continueShopping={() => history.push(BASE_URL)}
      orderNumber={orderNumber}
      orderDetails={() => history.push(generateGuestOrderDetailsUrl(token))}
      overlay={overlay}
    />
  );
};

export { ThankYouPage };
