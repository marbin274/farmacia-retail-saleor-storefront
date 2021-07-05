import { Money, TaxedMoney } from "@components/containers";
import { Button, CartIcon } from "@farmacia-retail/farmauna-components";
import { trackAddToCartWithShowShippingPrice } from "@temp/@next/optimizely/tracks";
import { useCart, useCheckout, useUserDetails } from "@temp/@sdk/react";
import { checkoutUrl, checkoutLoginUrl } from "@temp/app/routes";
import * as React from "react";
import { useHistory, useLocation } from "react-router";
import { TypedShippingMethods } from "../queries";
import "../scss/index.scss";
import { SkeletonCartFooter } from "./skeletonCartFooter";
import * as S from "./FooterWithShippingPriceStyles";
import { Icon } from "@temp/@next/components/atoms";
import { aunaBrand3 } from "@temp/@next/globalStyles/constants";

interface IProps {
    buttonText: string;
    hideOverlay(): void;
}

export const FooterWithShippingPrice: React.FC<IProps> = ({ buttonText, hideOverlay }) => {

    const history = useHistory();
    const location = useLocation();
    const { data: user } = useUserDetails();
    const { checkout } = useCheckout();
    const {
        discount,
        items,
        subtotalPrice,
    } = useCart();

    const itemsCount = items?.length || 0;

    const onClickBuyIcon = () => {
        const isInLoginPage = location.pathname.includes("login");
        trackAddToCartWithShowShippingPrice();
        if (isInLoginPage) hideOverlay();
        else {
            const urlToGo =
                user || (checkout && checkout.id) ? checkoutUrl : checkoutLoginUrl;
            history.push(urlToGo);
        }
    };

    return (
        <TypedShippingMethods
            alwaysLoader
            loader={<SkeletonCartFooter />}
            variables={{
                lines: items?.map(line => ({ quantity: line.quantity, variantId: line.variant?.id })),
            }}
        >
            {({ data }) => {
                let isAllFree: boolean = true;
                let orderPrice: number = 0;
                const potentialShippingMethods = data?.potentialShippingMethods.map((shippingMethod): JSX.Element => {

                    const shippingMethodPrice = shippingMethod.price?.amount || 0;
                    if (shippingMethodPrice > 0) {
                        isAllFree = false;
                    }

                    if(((shippingMethod.minimumOrderPrice?.amount) || 0) > orderPrice){
                        orderPrice = shippingMethod.minimumOrderPrice?.amount;
                    }

                    return (
                        <S.DetailsPrice key={shippingMethod.id} >
                            <S.ShippingMethodLabel>Total</S.ShippingMethodLabel>
                            <S.ShippingMethod>
                                <S.ShippingMethodName>
                                    {`Envío ${shippingMethod.isScheduled ? "programado" : "express"}`}
                                </S.ShippingMethodName>
                                {
                                    shippingMethodPrice > 0 ?
                                        <S.ShippingMethodPrice>
                                            &nbsp;(+ <Money money={shippingMethod.price} />)
                                        </S.ShippingMethodPrice>
                                        : <S.ShippingMethodFree>&nbsp;(Gratis)</S.ShippingMethodFree>
                                }
                            </S.ShippingMethod>
                            <S.ShippingMethodTotal
                                money={{
                                    ...shippingMethod.price,
                                    amount: shippingMethodPrice + (subtotalPrice?.net?.amount || 0) - (discount?.amount || 0)
                                }} />
                        </S.DetailsPrice>
                    );
                });


                return (
                    <S.Container>
                        {
                            isAllFree &&
                            <S.FreeShipping>
                                <span>Felicidades tienes <strong>envío gratis</strong></span>
                                <S.InfoIcon>
                                    <Icon name="info" color={aunaBrand3} size={20} heightViewPort={20} widthViewPort={20} />
                                    <S.ToolTipContainer>
                                        <S.ToolTipText>
                                            Si alcanzas a tener compras <strong>mayores</strong> a <strong>S/ ${orderPrice} soles</strong>, tu <strong>envío es totalmente <span className="free">gratis</span>.</strong>
                                        </S.ToolTipText>
                                    </S.ToolTipContainer>
                                </S.InfoIcon>
                            </S.FreeShipping>
                        }
                        <S.Details>                            
                            <S.DetailsPrice>
                                <S.DetailsPriceLabel>
                                    Subtotal <span>({`${itemsCount} ${itemsCount === 0 ? "producto" : "productos"}`})</span>
                                </S.DetailsPriceLabel>
                                <S.DetailsPriceTotal>
                                    <TaxedMoney
                                        data-cy="cartPageSubtotalPrice"
                                        taxedMoney={subtotalPrice}
                                    />
                                </S.DetailsPriceTotal>
                            </S.DetailsPrice>
                            {
                                discount && discount.amount > 0 && <S.DetailsDiscount>
                                    <span>
                                        Cupón
                                    </span>
                                    <span>
                                        <Money
                                            data-cy="cartPageDiscountPrice"
                                            negative
                                            money={discount}
                                        />
                                    </span>
                                </S.DetailsDiscount>
                            }
                            {
                                !isAllFree && potentialShippingMethods.map(shippingMethod => shippingMethod)
                            }
                        </S.Details>
                        <S.ButtonContainer>
                            <Button
                                icon={<CartIcon />}
                                fullWidth
                                size="large"
                                type="button"
                                onClick={onClickBuyIcon}
                            >
                                {buttonText}
                            </Button>
                        </S.ButtonContainer>
                    </S.Container>
                )
            }

            }
        </TypedShippingMethods>


    );
}
