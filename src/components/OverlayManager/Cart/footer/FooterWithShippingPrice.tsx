import { Money, TaxedMoney } from "@components/containers";
import { Button, CartIcon } from "@farmacia-retail/farmauna-components";
import { trackAddToCartWithShowShippingPrice } from "@temp/@next/optimizely/tracks";
import { useCart, useCheckout, useUserDetails } from "@temp/@sdk/react";
import { checkoutUrl, checkoutLoginUrl } from "@temp/app/routes";
import * as React from "react";
import { useHistory, useLocation } from "react-router";
import { TypedShippingMethods } from "../queries";
import "../scss/index.scss";
import { SkeletonCartFooter } from "../skeletonCartFooter";

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
                return <div className="cart__footer caseB">
                    <div className="cart__footer__details">
                        <div className="cart__footer__details__price">
                            <span className="cart__footer__details__price--label">
                                Subtotal <span>({`${itemsCount} ${itemsCount === 0 ? "producto": "productos"}`})</span>
                            </span>
                            <span  className="cart__footer__details__price--total">
                                <TaxedMoney
                                    data-cy="cartPageSubtotalPrice"
                                    taxedMoney={subtotalPrice}
                                />
                            </span>
                        </div>
                        {
                            data?.potentialShippingMethods?.map(shippingMethod => {
                                const shippingMethodPrice = shippingMethod.price?.amount || 0;
                                return (
                                    <div key={shippingMethod.id} className="cart__footer__details__price">
                                        <span className="cart__footer__details__price__shipping-method--label">Total</span>
                                        <span className="cart__footer__details__price__shipping-method__shipping">
                                            <span className="cart__footer__details__price__shipping-method__shipping--name">
                                                {`Envío ${shippingMethod.isScheduled ? "programado" : "express"}`}
                                            </span>
                                            {shippingMethodPrice > 0 ? <span className="cart__footer__details__price__shipping-method__shipping--price">
                                                &nbsp;(+ <Money money={shippingMethod.price} />)
                                            </span>
                                                : <span className="cart__footer__details__price__shipping-method__shipping--free">&nbsp;(Gratis)</span>
                                            }
                                        </span>
                                        <Money className="cart__footer__details__price__shipping-method--total" money={{ ...shippingMethod.price, amount: shippingMethodPrice + (subtotalPrice?.net?.amount || 0) }} />
                                    </div>
                                );
                            }
                            )
                        }
                    </div>
                    <div className="cart__footer__details__button">
                        <Button
                            icon={<CartIcon />}
                            fullWidth
                            size="large"
                            type="button"
                            onClick={onClickBuyIcon}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
            }

            }
        </TypedShippingMethods>


    );
}
