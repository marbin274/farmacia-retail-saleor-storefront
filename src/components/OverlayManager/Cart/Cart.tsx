import { CartIcon, XIcon } from '@farmacia-retail/farmauna-components';
import { useCart } from '@sdk/react';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { useShowShippingPriceInCart } from '@temp/libraries/optimizely/hooks';
import classNames from 'classnames';
import * as React from 'react';
import {
  Offline,
  OfflinePlaceholder,
  Online,
  OverlayContextInterface,
} from '../..';
import Empty from './components/Empty';
import { Footer, FooterWithShippingPrice } from './components/footer';
import ProductList from './components/ProductList';
import * as S from './styles';

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const { isMobileScreen } = useMediaScreen();
  const { buttonText, showShippingPrice } = useShowShippingPriceInCart();
  const cartBodyRef = React.useRef<HTMLDivElement>();
  const [isScrolledBodyCart, setIsScrolledBodyCart] =
    React.useState<boolean>(false);
  const isScrolledAndSmall = isScrolledBodyCart && isMobileScreen;
  const { addItem, items, removeItem, subtractItem } = useCart();

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
    <S.OverlayWrapper context={overlay}>
      <Online>
        <div
          className="fa-w-104 fa-max-w-screen fa-h-full fa-overflow-auto"
          onScroll={onScrollCart}
        >
          <div
            className={classNames(
              'fa-bg-primary-medium fa-sticky fa-flex fa-items-start fa-justify-between fa-border-none fa-top-0 fa-text-white sm:fa-relative fa-z-1',
              {
                'fa-pl-4 fa-pt-6 fa-pb-4 fa-pr-6 sm:fa-pl-10':
                  !isScrolledAndSmall,
                'fa-p-4': isScrolledAndSmall,
              }
            )}
          >
            <div className="fa-flex fa-items-start">
              <div className="fa-w-8 fa-h-8 fa-bg-brand-03 fa-rounded-full fa-flex fa-mr-3">
                <CartIcon className="fa-m-auto" />
              </div>
              <div>
                <span
                  className={classNames(
                    'fa-block fa-font-semibold fa-leading-8',
                    {
                      'fa-text-xl sm:fa-text-2xl': !isScrolledAndSmall,
                      'fa-text-base': isScrolledAndSmall,
                    }
                  )}
                >
                  Tu carrito{' '}
                  {isScrolledAndSmall
                    ? `(${totalProducts || 0} 
                  ${totalProducts === 1 ? 'producto' : 'productos'})`
                    : ''}
                </span>
                <span
                  className={classNames(
                    'fa-block fa-m-0 fa-text-base fa-leading-6 fa-font-medium',
                    {
                      'fa-h-0 fa-invisible': isScrolledAndSmall,
                    }
                  )}
                >
                  {totalProducts || 0}{' '}
                  {totalProducts === 1
                    ? 'producto en total'
                    : 'productos en total'}
                </span>
              </div>
            </div>
            <div
              className={classNames(
                'fa-w-8 fa-h-8 fa-bg-white fa-rounded-full fa-flex fa-text-blackDark',
                {
                  'fa-top-6 fa-right-6': !isScrolledAndSmall,
                  'fa-top-4 fa-right-4': isScrolledAndSmall,
                }
              )}
            >
              <XIcon
                onClick={overlay.hide}
                size={16}
                className="fa-m-auto fa-transform fa-translate-x-px fa-translate-y-px"
              ></XIcon>
            </div>
          </div>
          <S.CartBody className="fa-bg-neutral-light" ref={cartBodyRef}>
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
                {showShippingPrice ? (
                  <FooterWithShippingPrice
                    buttonText={buttonText}
                    hideOverlay={overlay.hide}
                  />
                ) : (
                  <Footer hideOverlay={overlay.hide} />
                )}
              </>
            ) : (
              <Empty overlayHide={overlay.showCatalog} />
            )}
          </S.CartBody>
        </div>
      </Online>
      <Offline>
        <div className="fa-w-104 fa-max-w-screen fa-h-full fa-overflow-auto">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </S.OverlayWrapper>
  );
};

export default Cart;
