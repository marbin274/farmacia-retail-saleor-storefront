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
                return (
                    <S.Container>
                        <S.Details className="cart__footer__details">
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
                                data?.potentialShippingMethods?.map(shippingMethod => {
                                    const shippingMethodPrice = shippingMethod.price?.amount || 0;
                                    return (
                                        <S.DetailsPrice key={shippingMethod.id} >
                                            <S.ShippingMethodLabel>Total</S.ShippingMethodLabel>
                                            <S.ShippingMethod>
                                                <S.ShippingMethodName>
                                                    {`Envío ${shippingMethod.isScheduled ? "programado" : "express"}`}
                                                </S.ShippingMethodName>
                                                {shippingMethodPrice > 0 ? <S.ShippingMethodPrice>
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
                                }
                                )
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
