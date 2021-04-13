import { ITaxedMoney } from "@temp/@next/types";

export interface IProps {
    promoPrice?: ITaxedMoney | null;
    subTotalPrice?: ITaxedMoney | null;
    shippingPrice?: ITaxedMoney | null;
    totalPrice?: ITaxedMoney | null;
    totalProducts: number;
}
