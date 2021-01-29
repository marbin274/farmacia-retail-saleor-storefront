import { styled } from "@styles";
import { aunaBlack, aunaDisabled, aunaPrimary, white } from "@styles/constants";

import { DOT_STATUS } from "./";
import addressIcon from "images/auna/checkout-address.svg";
// import deliveryIcon from "images/auna/checkout-delivery.svg";
import doneIcon from "images/auna/checkout-done.svg";
import paymentIcon from "images/auna/checkout-payment.svg";

export const ICON_COLORS = [
  aunaDisabled, // INACTIVE
  aunaPrimary, // ACTIVE
  white, // DONE
];

export const ICON_BG_COLORS = [
  white, // INACTIVE
  white, // ACTIVE
  aunaPrimary, // DONE
];

export const ICONS = [
  addressIcon,
  // deliveryIcon,
  paymentIcon,
  doneIcon,
];

export const flexCentered = {
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  width: "100%",
};

export const Dot = styled.div<{ status: DOT_STATUS }>`
  position: relative;
  width: 2.7rem;
  height: 2.7rem;
  border: 3px solid ${props => ICON_COLORS[props.status]};
  background-color: ${props => ICON_BG_COLORS[props.status]};
  border-radius: 10rem;
`;

export const Label = styled.div`
  color: ${aunaBlack};
  white-space: pre;
  display: block;
  font-family: "Poppins", sans-serif;
  font-size: 1.0rem;
  padding: 1rem 0;
  text-align: center;
`;

export const ProgressBar = styled.div<{ done?: boolean }>`
  z-index: -1;
  width: 100%;
  height: 4px;
  background-color: ${props => (props.done ? aunaPrimary : aunaDisabled)};
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-child) {
    width: 100%;
  }

  span {
    cursor: not-allowed;
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 23em;
  position: relative;
  width: 80%;
`;
