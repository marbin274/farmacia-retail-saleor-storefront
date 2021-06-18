import * as React from "react";
import { Link } from "react-router-dom";

import { Thumbnail } from "@components/molecules";

import { SearchResults_products_edges } from "./gqlTypes/SearchResults";
import { Money } from "src/@next/components/containers/Money/Money";
import { useCart } from "@temp/@sdk/react";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  getOneProductWithQuantity,
  getProductPricingClass,
} from "@temp/@next/utils/products";
import ItemsHandler from "@temp/@next/components/organisms/ItemsHandler/ItemsHandler";
import { convertToSimpleProduct, generateProductUrl } from "@temp/core/utils";
import { searchProductsService } from "@temp/@next/services/searchProductsService";

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

  const linkToProduct = generateProductUrl(product.id, product.name) + "";
  return (
    <li className="search__products__item">
      <div className="search__products__item__content">
        <Link
          to={linkToProduct}
          onClick={() => {
            searchProductsService.hide();
          }}
          className="search__products__item__link"
        >
          <div className="search__products__item__side">
            <Thumbnail source={node} />
            <p className="search__products__item__side__name">
              <div className="search__products__item__side__name_primary">{product.name}</div>
              <span>
                <div className="search__products__item__side__name_category">{product.category?.name}</div>
                <span
                  className={`search__products__item__side__price ${isOnSale &&
                    "search__products__item__side__price__on-sale"}`}
                >
                  <span className="title_price">Precio</span>
                  <Money className={isStockAvailable ? '' : 'fa-text-gray-02'} money={product.pricing.priceRange.start.net} />
                </span>
              </span>
            </p>
          </div>
        </Link>
        {!isStockAvailable ? (
          <p className="search__products__item__side__outstock">
            <span>Agotado</span>
          </p>
        ) : (
          <div className="search__products__item__side actions">
            <div
              className={getProductPricingClass(canAddToCart, isOnSale)}
            ></div>
            <ItemsHandler
              canAddToCart={canAddToCart}
              product={product}
              addToCart={addItem}
              removeItemToCart={subtractItem}
              subtractItemToCart={subtractItem}
            />
          </div>
        )}
      </div>
    </li>
  );
};
export default ProductItem;
