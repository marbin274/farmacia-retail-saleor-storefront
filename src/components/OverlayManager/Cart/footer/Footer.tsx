import { TaxedMoney } from "@components/containers";
import { Button, CartIcon } from "@farmacia-retail/farmauna-components";
import { useCart, useCheckout, useUserDetails } from "@temp/@sdk/react";
import { checkoutLoginUrl, checkoutUrl } from "@temp/app/routes";
import * as React from "react";
import { useHistory, useLocation } from "react-router";
import "../scss/index.scss";
import * as S from "./FooterStyles";
interface IProps {
    hideOverlay(): void;
}

export const Footer: React.FC<IProps> = ({ hideOverlay }) => {

    const history = useHistory();
    const location = useLocation();
    const { data: user } = useUserDetails();
    const { checkout } = useCheckout();
    const {
        discount,
        shippingPrice,
        subtotalPrice,
        totalPrice,
    } = useCart();

    const shippingTaxedPrice =
        checkout?.shippingMethod?.id && shippingPrice
            ? {
                gross: shippingPrice,
                net: shippingPrice,
            }
            : null;
    const promoTaxedPrice = discount && {
        gross: discount,
        net: discount,
    };

    const onClickBuyIcon = () => {
        const isInLoginPage = location.pathname.includes("login");

        if (isInLoginPage) hideOverlay();
        else {
            const urlToGo =
                user || (checkout && checkout.id) ? checkoutUrl : checkoutLoginUrl;
            history.push(urlToGo);
        }
    };

    return (
        <S.Container>
            <S.Details className="cart__footer__details">
                <div className="cart__footer__details__price">
                    <S.SubTotalLabel>Subtotal:</S.SubTotalLabel>
                    <span>
                        <TaxedMoney
                            data-cy="cartPageSubtotalPrice"
                            taxedMoney={subtotalPrice}
                        />
                    </span>
                </div>

                {shippingTaxedPrice &&
                    shippingTaxedPrice.gross.amount !== 0 && (
                        <div className="cart__footer__details__price">
                            <span>Shipping:</span>
                            <span>
                                <TaxedMoney
                                    data-cy="cartPageShippingPrice"
                                    taxedMoney={shippingTaxedPrice}
                                />
                            </span>
                        </div>
                    )}

                {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                    <div className="cart__footer__details__price">
                        <span>Promo code:</span>
                        <span>
                            -&nbsp;
                            <TaxedMoney
                                data-cy="cartPagePromoCodePrice"
                                taxedMoney={promoTaxedPrice}
                            />
                        </span>
                    </div>
                )}

                <div className="cart__footer__details__price cart__footer__details__price--total">
                    <S.TotalLabel>Total:</S.TotalLabel>
                    <S.TotalPrice>
                        <TaxedMoney
                            data-cy="cartPageTotalPrice"
                            taxedMoney={totalPrice}
                        />
                    </S.TotalPrice>
                </div>
            </S.Details>
            <S.ButtonContainer>
                <Button
                    icon={<CartIcon />}
                    size="large"
                    onClick={onClickBuyIcon}
                >
                    Comprar
                </Button>
            </S.ButtonContainer>
        </S.Container>

    );
}
