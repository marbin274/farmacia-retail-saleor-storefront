import * as React from "react";
import { Link } from "react-router-dom";
import farmatheme from "@farmatheme";
import { Thumbnail } from "@components/molecules";

import { SearchResults_products_edges } from "./gqlTypes/SearchResults";
import { Money } from "src/@next/components/containers/Money/Money";
import { useCart } from "@temp/@sdk/react";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  getOneProductWithQuantity,
} from "@sdk/utils/products";
import {
  getProductPricingClass,  
} from "@temp/@next/utils/products"
import ItemsHandler from "@temp/@next/components/organisms/ItemsHandler/ItemsHandler";
import { convertToSimpleProduct, generateProductUrl } from "@temp/core/utils";
import { searchProductsService } from "@temp/@next/services/searchProductsService";
import { Chip } from "@farmacia-retail/farmauna-components";

const ProductItem: React.FC<SearchResults_products_edges> = ({ node }) => {
  const { items, addItem, subtractItem } = useCart();
  const product = getOneProductWithQuantity(
    convertToSimpleProduct(node),
    items
  );
  const { canAddToCart, isStockAvailable } = checkProductCanAddToCart(
    product,
    items
  );
  const isOnSale = checkProductIsOnSale(product);
  const refActions = React.useRef({} as any);

  const linkToProduct = generateProductUrl(product.id, product.name) + "";
  return (
    <li className="fa-border-b fa-border-solid fa-border-neutral-medium lg:fa-border-0 search__products__item">
      <div className="search__products__item__content">
        <Link
          to={linkToProduct}
          onClick={(e)=> {
            if (refActions?.current?.contains(e.target)) {
              e.preventDefault();
            } else {
              searchProductsService.hide();
            }
          }}
          className="search__products__item__link"
        >
          <div className="search__products__item__side search__products__item__side--card">
            <div className='fa-flex fa-flex-row fa-flex-wrap fa-justify-center fa-relative'>
              <Thumbnail source={node} />
              <span className='lg:fa-absolute lg:fa-top-0 lg:fa-left-0'>
                {
                  !isStockAvailable && <Chip bgColor={farmatheme.theme.colors.neutral.medium} label="Agotado"/>
                }
                {
                  (isOnSale && isStockAvailable) && <Chip label="Oferta"/>
                }
              </span>
            </div>
            <p className="search__products__item__side__name">
              <div>
                <span className="search__products__item__side__name_primary">{product.name}</span>
                <span className="fa-text-neutral-dark fa-text-xs fa-block fa-mt-2 fa-font-normal">{product.category?.name}</span>
              </div>
              <span className="fa-flex fa-items-center fa-justify-between">
                <span
                  className={`search__products__item__side__price ${isOnSale &&
                    "search__products__item__side__price__on-sale"}`}
                >
                  <span className="title_price">Precio</span>
                  <Money className={isStockAvailable ? '' : 'fa-text-gray-02'} money={product.pricing.priceRange.start.net} />
                </span>
                <div className="search__products__item__side actions" ref={refActions}>
                    <div
                      className={getProductPricingClass(canAddToCart, isOnSale)}
                    ></div>
                    <ItemsHandler
                      disableOnAdd={!isStockAvailable}
                      canAddToCart={canAddToCart}
                      product={product}
                      addToCart={addItem}
                      removeItemToCart={subtractItem}
                      subtractItemToCart={subtractItem}
                    />
                  </div>
              </span>
            </p>
          </div>
        </Link>
      </div>
    </li>
  );
};
export default ProductItem;
