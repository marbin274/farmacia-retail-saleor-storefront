import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { launchRemoveToCartEvent } from "@sdk/gaConfig";
import {
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage,
} from "@sdk/repository";
import ItemsHandler from "@temp/@next/components/organisms/ItemsHandler/ItemsHandler";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  convertProductOnCartInProduct,
  getProductPricingClass,
} from "@temp/@next/utils/products";
import { generateProductUrl } from "@temp/core/utils";
import { Button, TrashIcon } from "@farmacia-retail/farmauna-components";
import * as React from "react";
import { Link } from "react-router-dom";
import "react-popper-tooltip/dist/styles.css";
import { Tooltip } from "@temp/@next/components/atoms";

interface IProductList {
  itemToDelete: string;
  modalOpen: boolean;
  products: ICheckoutModelLine[];
  onAdd(variant: ICheckoutModelLineVariantLocalStorage, quantity: number): void;
  onRemove(variantId: string): void;
  onSubtract(variantId: string): void;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ProductList: React.FC<IProductList> = ({
  products,
  onAdd,
  onRemove,
  onSubtract,
  modalOpen,
  itemToDelete,
  onConfirm,
  onCancel,
}) => (
  <ul className="cart__list">
    {products.map(product => {
      const { variant, quantity } = product;
      const { canAddToCart } = checkProductCanAddToCart(
        convertProductOnCartInProduct(product),
        products
      );
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
      return (
        <li key={id} className="cart__list__item">
          <Link className="cart__list__item__image" to={productUrl}>
            {variant.product && <Thumbnail source={variant.product} />}
          </Link>
          <div className="cart__list__item__details">
            {modalOpen && itemToDelete === variant.id ? (
              <div className="cart__list__item__delete">
                <h4>¿Deseas eliminar este producto?</h4>
                <h4>{name}</h4>
                <div className="cart__list__item__delete--options">
                  <Button onClick={onConfirm}>Aceptar</Button>
                  <Button onClick={onCancel} variant="outline">
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="cart__list__item__up">
                  <Link to={productUrl}>
                    <p className="cart__list__item__details--name">{name}</p>
                  </Link>
                </div>
                <div className="cart__list__item__down">
                  <div className="cart__list__item__price">
                    <p className="cart__list__item__price__title">Precio</p>
                    <TaxedMoney
                      className={`cart__list__item__price__value ${getProductPricingClass(
                        canAddToCart,
                        isOnSale
                      )}`}
                      taxedMoney={variant.pricing.price}
                    />
                  </div>
                  <ItemsHandler
                    canAddToCart={canAddToCart}
                    product={product}
                    addToCart={onAdd}
                    removeItemToCart={onRemove}
                    subtractItemToCart={onSubtract}
                  />
                  <Tooltip
                    className="cart__list__item__details--button-tooltip"
                    text="Quitar"
                  >
                    <Button
                      className="cart__list__item__details--button"
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
                </div>
              </>
            )}
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
