import { TaxedMoney } from '@components/containers';
import { Thumbnail } from '@components/molecules';
import { Button, TrashIcon } from '@farmacia-retail/farmauna-components';
import { launchRemoveToCartEvent } from '@sdk/gaConfig';
import {
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage,
} from '@sdk/repository';
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
} from '@sdk/utils/products';
import { Tooltip } from '@temp/@next/components/atoms';
import ItemsHandler from '@temp/@next/components/organisms/ItemsHandler/ItemsHandler';
import { removePaymentItems } from '@temp/@next/utils/checkoutValidations';
import {
  convertProductOnCartInProduct,
  getProductPricingClass,
} from '@temp/@next/utils/products';
import { generateProductUrl } from '@temp/core/utils';
import classNames from 'classnames';
import * as React from 'react';
import 'react-popper-tooltip/dist/styles.css';
import { Link } from 'react-router-dom';
import {
  ButtonTrash,
  List,
  ListItemDeleteOptions,
  ListItemDetails,
  ListItemDown,
  ListItemLinkImage,
  ListItemName,
  ListItemPriceWrapper,
} from '../styles';

interface IProductList {
  itemToDelete: string;
  modalOpen: boolean;
  morePadding?: boolean;
  products: ICheckoutModelLine[];
  onAdd(variant: ICheckoutModelLineVariantLocalStorage, quantity: number): void;
  onRemove(variantId: string): void;
  onSubtract(variantId: string): void;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ProductList: React.FC<IProductList> = ({
  itemToDelete,
  modalOpen,
  morePadding = false,
  products,
  onAdd,
  onRemove,
  onSubtract,
  onConfirm,
  onCancel,
}) => (
  <List morePadding={morePadding}>
    {products.map((ProductOnCart) => {
      const product = convertProductOnCartInProduct(ProductOnCart);
      const { variant, quantity } = ProductOnCart;
      const { canAddToCart } = checkProductCanAddToCart(product, products);
      const isOnSale = checkProductIsOnSale(product);
      const id: string | undefined = variant.product?.id;
      const name: string | undefined = product.name
        ? product.name
        : variant.product?.name;
      const productUrl: string | undefined =
        id && name ? generateProductUrl(id, name) : undefined;

      if (!productUrl) {
        return null;
      }

      const isToDelete = modalOpen && itemToDelete === variant.id;
      return (
        <li
          key={id}
          className={classNames(
            'fa-rounded-none fa-border-b fa-border-solid fa-border-neutral-medium fa-p-4 fa-flex fa-m-auto fa-mb-0 fa-items-center sm:fa-mb-6 sm:fa-rounded-3xl sm:fa-border-none',
            {
              'fa-bg-white': isToDelete,
              'fa-bg-neutral-light sm:fa-bg-white': !isToDelete,
            }
          )}
        >
          <ListItemLinkImage
            className="fa-w-16 fa-h-16 fa-mr-2 fa-bg-white fa-rounded-lg sm:fa-rounded-none fa-flex fa-self-start sm:fa-mr-4 sm:fa-w-18 sm:fa-h-18"
            to={productUrl}
          >
            {variant.product && <Thumbnail source={variant.product} />}
          </ListItemLinkImage>
          <ListItemDetails>
            {isToDelete ? (
              <div>
                <h4 className="fa-text-center fa-text-sm fa-leading-6 fa-tracking-tighter fa-text-neutral-darkest fa-font-medium fa-mb-1">
                  ¿Deseas eliminar este producto?
                </h4>
                <h4 className="fa-text-center fa-text-sm fa-leading-4 fa-text-neutral-darkest fa-font-semibold fa-mb-2">
                  {name}
                </h4>
                <ListItemDeleteOptions className="fa-flex fa-justify-center">
                  <Button onClick={onConfirm} size="small">
                    Aceptar
                  </Button>
                  <Button onClick={onCancel} size="small" variant="outline">
                    Cancelar
                  </Button>
                </ListItemDeleteOptions>
              </div>
            ) : (
              <>
                <div>
                  <Link to={productUrl}>
                    <ListItemName className="fa-w-full fa-text-neutral-darkest fa-text-sm fa-font-medium fa-leading-6">
                      {name}
                    </ListItemName>
                  </Link>
                </div>
                <ListItemDown className="fa-flex fa-justify-between fa-mt-2 fa-items-start">
                  <ListItemPriceWrapper>
                    <p className="fa-m-0 fa-text-neutral-medium fa-text-xs fa-leading-3 fa-font-medium fa-tracking-tighter">
                      Precio
                    </p>
                    <TaxedMoney
                      className={classNames(
                        getProductPricingClass(canAddToCart, isOnSale),
                        'fa-mr-2'
                      )}
                      taxedMoney={variant.pricing.price}
                    />
                  </ListItemPriceWrapper>
                  <ItemsHandler
                    canAddToCart={canAddToCart}
                    product={product}
                    addToCart={onAdd}
                    removeItemToCart={onRemove}
                    subtractItemToCart={onSubtract}
                    isPersonalizeProduct={false}
                  />
                  <Tooltip className="fa-mb-1" text="Quitar">
                    <ButtonTrash
                      icon={<TrashIcon size={16} />}
                      onClick={() => {
                        removePaymentItems();
                        onRemove(variant.id);
                        launchRemoveToCartEvent(
                          variant?.sku,
                          variant?.product?.name,
                          variant?.pricing?.price?.gross,
                          quantity
                        );
                      }}
                      iconOnly
                    />
                  </Tooltip>
                </ListItemDown>
              </>
            )}
          </ListItemDetails>
        </li>
      );
    })}
  </List>
);
export default ProductList;
