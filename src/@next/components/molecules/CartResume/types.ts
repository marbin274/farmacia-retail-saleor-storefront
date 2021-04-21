import { ITaxedMoney } from "@temp/@next/types";

export interface IProps {
    activeStepIndex: number;
    onClickHandle: () => void;
    promoPrice?: ITaxedMoney | null;
    subTotalPrice?: ITaxedMoney | null;
    shippingPrice?: ITaxedMoney | null;
    totalPrice?: ITaxedMoney | null;
    totalProducts: number;
}
