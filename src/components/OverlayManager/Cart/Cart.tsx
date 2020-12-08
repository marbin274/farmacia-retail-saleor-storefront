import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { TaxedMoney } from "@components/containers";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";
import "./scss/index.scss";
import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { checkoutLoginUrl, checkoutUrl } from "../../../app/routes";
import DeleteModal from "./DeleteModal";
import Empty from "./Empty";
import ProductList from "./ProductList";
import aunaImg from "../../../images/logo.svg";
import closeImg from "../../../images/close-circle.svg";
import cartImg from "../../../images/cart-light.svg";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
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

  return (
    <Overlay context={overlay}>
      <Online>
        {isModelOpen ? (
          <div className="cart">
            <DeleteModal
              onConfirm={() => removeItemAndHideModal()}
              onCancel={() => setIsModelOpen(false)}
              onClose={() => setIsModelOpen(false)}
            />
          </div>
        ) : (
          <div className="cart">
            <div className="overlay__header">
              <div className="overlay__header__top">
                <div />
                <ReactSVG
                  path={aunaImg}
                  onClick={overlay.hide}
                  className="overlay__header__close-icon"
                />
                <ReactSVG
                  path={closeImg}
                  onClick={overlay.hide}
                  className="overlay__header__close-icon"
                />
              </div>
              <div className="overlay__header__bottom">
                <div className="overlay__header-text">
                  Tu carrito{" "}
                  <span className="overlay__header-text-items">
                    {totalProducts || 0}{" "}
                    {totalProducts === 1 ? "producto" : "productos"}
                  </span>
                </div>
                <ReactSVG
                  path={cartImg}
                  className="overlay__header__cart-icon"
                />
              </div>
            </div>
            {items?.length ? (
              <>
                <ProductList
                  products={items}
                  onAdd={addItem}
                  onRemove={showModal}
                  onSubtract={subtractItem}
                />
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
                        -&nbsp;
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
              <Empty overlayHide={overlay.showCatalog} />
            )}
          </div>
        )}
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
