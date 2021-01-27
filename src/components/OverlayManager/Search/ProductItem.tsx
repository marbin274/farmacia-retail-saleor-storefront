import * as React from "react";
import { Link } from "react-router-dom";

import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../../core/utils";
import { SearchResults_products_edges } from "./gqlTypes/SearchResults";
import { Money } from 'src/@next/components/containers/Money/Money';
import { useCart } from "@temp/@sdk/react";
import { checkProductCanAddToCart, checkProductIsOnSale, getProductPricingClass } from "@temp/@next/utils/products";

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
}) => {
  const { items } = useCart();
  const canAddToCart = checkProductCanAddToCart(product, items);
  const isOnSale = checkProductIsOnSale(product);
  return (
    <li className="search__products__item">
      <Link to={generateProductUrl(product.id, product.name)}>
        <div className="search__products__item__content">
          <div className="search__products__item__side">
            <Thumbnail source={product} />
            <p className="search__products__item__side__name">
              {product.name}
              <span>{product.category?.name}</span>
            </p>
          </div>
          <div className="search__products__item__side">
            {canAddToCart ?
              <div className={getProductPricingClass(canAddToCart, isOnSale)}><p className="search__products__item__side__price"><Money money={product.pricing.priceRange.start.net} /></p></div>
              : <p className="search__products__item__side__outstock"><span>Agotado</span></p>
            }
          </div>
        </div>
      </Link>
    </li>
  );
}
export default ProductItem;
