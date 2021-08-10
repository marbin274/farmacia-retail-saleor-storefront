import { useCart } from "@sdk/react";
import { CartIcon, XIcon } from "@farmacia-retail/farmauna-components";
import * as React from "react";
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
import { Footer, FooterWithShippingPrice } from "./footer";
import { useShowShippingPriceInCart } from "@temp/libraries/optimizely/hooks";
import { useMediaScreen } from "@temp/@next/globalStyles";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const { isMobileScreen } = useMediaScreen();
  const { buttonText, showShippingPrice } = useShowShippingPriceInCart();
  const cartBodyRef = React.useRef<HTMLDivElement>();
  const [isScrolledBodyCart, setIsScrolledBodyCart] =
    React.useState<boolean>(false);
  const isScrolledAndSmall = isScrolledBodyCart && isMobileScreen;
  const {
    addItem,
    items,
    removeItem,
    subtractItem,
  } = useCart();
  

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

 

  const onScrollCart = () => {
    if (!isMobileScreen) return;
    const { top: cartBodyTop } = cartBodyRef.current.getBoundingClientRect();
    const limitTopScroll = 60; // HEIGHT HEADER - 2.25rem
    const isScrolled = cartBodyTop <= limitTopScroll;
    if (isScrolled !== isScrolledBodyCart) setIsScrolledBodyCart(isScrolled);
  };

  return (
    <Overlay context={overlay}>
      <Online>
        <div className="cart" onScroll={onScrollCart}>
          <div
            className={`overlay__header ${isScrolledAndSmall && "scrolled"}`}
          >
            <div className="overlay__header__text">
              <div className="overlay__header__text__cart-icon">
                <CartIcon></CartIcon>
              </div>
              <div className="overlay__header__text__info">
                <span
                  className={`overlay__header__text__info__title ${
                    isScrolledAndSmall && "scrolled"
                  }`}
                >
                  Tu carrito{" "}
                  {isScrolledAndSmall
                    ? `(${totalProducts || 0} 
                  ${totalProducts === 1 ? "producto" : "productos"})`
                    : ""}
                </span>
                <span
                  className={`overlay__header__text__info__items ${
                    isScrolledAndSmall && "scrolled"
                  }`}
                >
                  {totalProducts || 0}{" "}
                  {totalProducts === 1
                    ? "producto en total"
                    : "productos en total"}
                </span>
              </div>
            </div>
            <div
              className={`overlay__header__close-icon ${
                isScrolledAndSmall && "scrolled"
              }`}
            >
              <XIcon onClick={overlay.hide} size={16}></XIcon>
            </div>
          </div>
          <div className="cart__body" ref={cartBodyRef}>
            {items?.length ? (
              <>
                <ProductList
                  itemToDelete={itemToDelete}
                  modalOpen={isModelOpen}
                  morePadding={showShippingPrice}
                  products={items}
                  onAdd={addItem}
                  onRemove={showModal}
                  onSubtract={subtractItem}
                  onConfirm={() => removeItemAndHideModal()}
                  onCancel={() => setIsModelOpen(false)}
                  onClose={() => setIsModelOpen(false)}
                />
                {
                  showShippingPrice ?
                    <FooterWithShippingPrice buttonText={buttonText} hideOverlay={overlay.hide} />
                    : <Footer hideOverlay={overlay.hide} />
                }
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
