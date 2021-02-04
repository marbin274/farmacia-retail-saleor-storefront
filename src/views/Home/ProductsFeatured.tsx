import { IAddToCartCallback } from "@app/components/molecules/ProductTileAUNA/types";
import { ISimpleProduct } from "@app/types/IProduct";
import { IItems } from "@sdk/api/Cart/types";
import { Carousel } from "@temp/@next/components/containers";
import { ProductTileAUNA } from "@temp/@next/components/molecules";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { TypedFeaturedProductsQuery } from "@temp/components/ProductsFeatured/queries";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import { generateProductUrl, maybe } from "@temp/core/utils";
import * as React from "react";
import "./scss/index.scss";
import * as S from './styles';

interface ProductsFeaturedProps {
  loading: boolean;
  productsOnCart: IItems;
  title?: string;
  addToCart: IAddToCartCallback;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ loading, productsOnCart, addToCart }) => {
  return (
    <TypedFeaturedProductsQuery
      displayError={false}
      variables={{ first: PRODUCTS_PER_PAGE }}>
      {({ data }) => {

        if (data?.shop?.homepageCollections?.length) {
          return data.shop.homepageCollections.map(collection => {
            const products: ISimpleProduct[] = maybe(
              () => collection.products.edges.map(product => ({ ...product.node })),
              []
            );
            return <div key={collection.id} className="products-featured">
              <S.Container>
                <h2 className="home-page__products-title">{collection.name}</h2>
                <Carousel>
                  {getProductsWithQuantity(products, productsOnCart).map((product) =>
                    <ProductTileAUNA
                      key={product.id}
                      addToCart={addToCart}
                      product={product}
                      productsOnCart={productsOnCart}
                      productUrl={generateProductUrl(product.id, product.name)}
                    />)}
                </Carousel>
              </S.Container>
              <br />
            </div>
          });
        } else {
          return null;
        }
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Nuestros recomendados",
};

export default ProductsFeatured;
