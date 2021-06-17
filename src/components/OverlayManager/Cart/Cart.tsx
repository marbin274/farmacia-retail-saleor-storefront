import { TaxedMoney } from "@components/containers";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";
import { checkoutLoginUrl, checkoutUrl } from "@temp/app/routes";
import { Button, CartIcon, XIcon } from "@farmacia-retail/farmauna-components";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import Empty from "./Empty";
import ProductList from "./ProductList";
import "./scss/index.scss";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const history = useHistory();
  const location = useLocation();
  const { data: user } = useUserDetails();
  const { checkout } = useCheckout();
  const {
    addItem,
    discount,
    items,
    removeItem,
    shippingPrice,
    subtotalPrice,
    subtractItem,
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

  const totalProducts = items?.reduce(
    (prevVal, currVal) => prevVal + currVal.quantity,
    0
  );

  const showModal = (itemId: string) => {
    setItemToDelete(itemId);
    setIsModelOpen(true);
  };

  const removeItemAndHideModal = () => {
    removeItem(itemToDelete);
    setIsModelOpen(false);
  };

  const onClickBuyIcon = () => {
    const isInLoginPage = location.pathname.includes("login");

    if (isInLoginPage) overlay.hide();
    else {
      const urlToGo =
        user || (checkout && checkout.id) ? checkoutUrl : checkoutLoginUrl;
      history.push(urlToGo);
    }
  };

  return (
    <Overlay context={overlay}>
      <Online>
        <div className="cart">
          <div className="overlay__header">
            <div className="overlay__header__text">
              <div className="overlay__header__text__cart-icon">
                <CartIcon></CartIcon>
              </div>
              <div className="overlay__header__text__info">
                <span>Tu carrito</span>
                <span className="overlay__header-text-items">
                  {totalProducts || 0}{" "}
                  {totalProducts === 1
                    ? "producto en total"
                    : "productos en total"}
                </span>
              </div>
            </div>
            <div className="overlay__header__close-icon">
              <XIcon onClick={overlay.hide} size={16}></XIcon>
            </div>
          </div>
          <div className="cart__body">
            {items?.length ? (
              <>
                <ProductList
                  modalOpen={isModelOpen}
                  itemToDelete={itemToDelete}
                  products={items}
                  onAdd={addItem}
                  onRemove={showModal}
                  onSubtract={subtractItem}
                  onConfirm={() => removeItemAndHideModal()}
                  onCancel={() => setIsModelOpen(false)}
                  onClose={() => setIsModelOpen(false)}
                />
                <div className="cart__footer">
                  <div className="cart__footer__details">
                    <div className="cart__footer__details__price">
                      <span>Subtotal:</span>
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
                      <span>Total:</span>
                      <span>
                        <TaxedMoney
                          data-cy="cartPageTotalPrice"
                          taxedMoney={totalPrice}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="cart__footer__details__button">
                    <Button
                      icon={<CartIcon />}
                      size="normal"
                      onClick={onClickBuyIcon}
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <Empty overlayHide={overlay.showCatalog} />
            )}
          </div>
        </div>
      </Online>
      <Offline>
        <div className="cart">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </Overlay>
  );
};

export default Cart;
