import { ISimpleProduct } from "@app/types/IProduct";
import { Carousel } from "@temp/@next/components/containers";
import { ProductTileAUNA } from "@temp/@next/components/molecules";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { TypedFeaturedProductsQuery } from "@temp/components/ProductsFeatured/queries";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import { convertToSimpleProduct, generateProductUrl, maybe } from "@temp/core/utils";
import * as React from "react";
import "./scss/index.scss";
import * as S from "./styles";
import { IProps } from "./types";


const ProductsFeatured: React.FC<IProps> = ({
  productsOnCart,
  removeItemToCart,
  addToCart,
  subtractItemToCart,
}) => {

  const [districtSelected] = useDistrictSelected();

  return (
    <TypedFeaturedProductsQuery
      displayError={false}
      variables={{ 
        first: PRODUCTS_PER_PAGE,
        districtId: districtSelected.id,
       }}
    >
      {({ data }) => {
        if (data?.shop?.homepageCollections?.length) {
          return data.shop.homepageCollections.map(collection => {
            const products: ISimpleProduct[] = maybe(
              () =>
                collection.products.edges.map((product): ISimpleProduct => convertToSimpleProduct(product.node)),
              []
            );
            return (
              <div key={collection.id} className="products-featured">
                <S.Container>
                  <div className='inner-container'>
                    <h2 className="home-page__products-title">
                      {collection.name}
                    </h2>
                  </div>
                  <Carousel>
                    {getProductsWithQuantity(products, productsOnCart).map(
                      product => (
                        <ProductTileAUNA
                          key={product.id}
                          addToCart={addToCart}
                          removeItemToCart={removeItemToCart}
                          subtractItemToCart={subtractItemToCart}
                          product={product}
                          productsOnCart={productsOnCart}
                          productUrl={generateProductUrl(
                            product.id,
                            product.name
                          )}
                        />
                      )
                    )}
                  </Carousel>
                </S.Container>
                <br />
              </div>
            );
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
