import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { checkoutLoginUrl, checkoutUrl } from "../../../app/routes";
import Empty from "./Empty";
import ProductList from "./ProductList";

import cartImg from "../../../images/cart-light.svg";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { data: user } = useUserDetails();
  const { checkout } = useCheckout();
  const {
    items,
    removeItem,
    subtotalPrice,
    shippingPrice,
    discount,
    totalPrice,
    addItem,
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

  return (
    <Overlay context={overlay}>
      <Online>
        <div className="cart"> 
          <div className="overlay__header">
            <div className="overlay__header-text">
              Tu carrito,{" "}
              <span className="overlay__header-text-items">
                {items?.reduce(
                  (prevVal, currVal) => prevVal + currVal.quantity,
                  0
                ) || 0}{" "}
               {items && items.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            <ReactSVG
              path={cartImg}
              onClick={overlay.hide}
              className="overlay__header__close-icon"
            />
          </div>
          {items?.length ? (
            <>
              <ProductList lines={items} remove={removeItem} add={addItem} />
              <div className="cart__footer">
                <div className="cart__footer__price cart__footer__price--sub">
                  <span>Subtotal</span>
                  <span>
                    <TaxedMoney
                      data-cy="cartPageSubtotalPrice"
                      taxedMoney={subtotalPrice}
                    />
                  </span>
                </div>

                {shippingTaxedPrice && shippingTaxedPrice.gross.amount !== 0 && (
                  <div className="cart__footer__price">
                    <span>Shipping</span>
                    <span>
                      <TaxedMoney
                        data-cy="cartPageShippingPrice"
                        taxedMoney={shippingTaxedPrice}
                      />
                    </span>
                  </div>
                )}

                {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                  <div className="cart__footer__price">
                    <span>Promo code</span>
                    <span>
                      <TaxedMoney
                        data-cy="cartPagePromoCodePrice"
                        taxedMoney={promoTaxedPrice}
                      />
                    </span>
                  </div>
                )}

                <div className="cart__footer__price">
                  <span>Total</span>
                  <span>
                    <TaxedMoney
                      data-cy="cartPageTotalPrice"
                      taxedMoney={totalPrice}
                    />
                  </span>
                </div>
                <div className="cart__footer__button">
                  <Link to={user ? checkoutUrl : checkoutLoginUrl}>
                    <Button>Comprar</Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Empty overlayHide={overlay.hide} />
          )}
        </div>
      </Online>
      {/* // TODO: revisar comportamiento offline */}
      <Offline>
        <div className="cart">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </Overlay>
  );
};

export default Cart;
