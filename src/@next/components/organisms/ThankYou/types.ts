import { OverlayContextInterface } from '@components/organisms/OverlayComponent/context';
import { ICheckout, IPayment } from '@sdk/api/Checkout/types';
import { ICheckoutModelPriceValue } from '@temp/@sdk/repository';
import { ISubtotalPrice, ITotalPrice } from '@temp/@sdk/api/Cart/types';
import { GetShop } from '@temp/@sdk/queries/gqlTypes/GetShop';
import { IStep } from '../../molecules/CheckoutProgressBar/types';
export {
  OverlayTheme,
  OverlayType,
} from '@temp/@next/components/organisms/OverlayComponent';

export interface IPromoTaxedPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}

export interface IShippingTaxedPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}
export interface IProps {
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
  overlay?: OverlayContextInterface | undefined;
  sequentialCode: string;
  steps: IStep[];
  data?: GetShop | null;
  checkout?: ICheckout | undefined;
  payment?: IPayment | undefined;
  promoTaxedPrice?: IPromoTaxedPrice | undefined | null;
  subtotalPrice?: ISubtotalPrice | null;
  shippingTaxedPrice?: IShippingTaxedPrice | null;
  totalPrice?: ITotalPrice;
  totalProducts: number;
  selectedPaymentGatewayToken?: string | undefined;
}
