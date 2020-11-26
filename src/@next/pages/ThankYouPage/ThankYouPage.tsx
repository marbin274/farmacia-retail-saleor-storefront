import React, { useContext, useEffect, useState } from "react";
import { useCheckout } from "@sdk/react";

import { useHistory } from "react-router-dom";

// import { useHistory, useLocation } from "react-router-dom";
import { ThankYou } from "@components/organisms";
import { BASE_URL } from "@temp/core/config";
import { generateGuestOrderDetailsUrl } from "@utils/core";
import { OverlayContext, OverlayContextInterface } from "@temp/components/Overlay/context";

import { IProps } from "./types";


const ThankYouPage: React.FC<IProps> = ({}: IProps) => {
const history = useHistory();
const { completeCheckout } = useCheckout();

const overlay: OverlayContextInterface | undefined = useContext(OverlayContext);

// @ts-ignore
const [ token, setToken ] = useState("");

// @ts-ignore
const [ orderNumber, setOrderNumber ] = useState("");

    useEffect(() => {
      // const pathname = window.location.pathname;

      // TODO: Remove this commented lines, we'll changing our strategy
      // const pathElements = pathname.split('/');
      // setToken(pathElements[2]);
      // setOrderNumber(pathElements[3]); 

      async function completeCheckoutSync() {
        await completeCheckout();
      }

      completeCheckoutSync();
    }, []);
  

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
