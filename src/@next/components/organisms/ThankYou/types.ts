import { OverlayContextInterface } from "@temp/components/Overlay/context";
export { OverlayTheme, OverlayType } from "@temp/components/Overlay";

export interface IProps {
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
  overlay?: OverlayContextInterface | undefined;
}
