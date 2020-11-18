import * as React from "react";
import { Link } from "react-router-dom";

import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../../core/utils";
import { SearchResults_products_edges } from "./gqlTypes/SearchResults";
import { Money } from 'src/@next/components/containers/Money/Money';

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
}) => (
  <li className="search__products__item">
    <Link to={generateProductUrl(product.id, product.name)}>
      <div className="search__products__item__content">
        <div className="search__products__item__side">
          <Thumbnail source={product} />
          <p className="search__products__item__side__name">
            {product.name}
            <span>{product.category.name}</span>
          </p>
        </div>
        <div className="search__products__item__side">
          <p className="search__products__item__side__price">
            <Money money={product.pricing.priceRange.start.net} />
          </p>
        </div>
      </div>
    </Link>
  </li>
);

export default ProductItem;
