import React, { FC } from "react";
import { PaymentMethods } from "./components/PaymentMethods";
import { IProps } from "./types";

export const PaymentMethodList: FC<IProps> = () => {
  return (
    <div>
      <PaymentMethods creditCards={[]} />
    </div>
  );
};
