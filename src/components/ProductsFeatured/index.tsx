import { ISimpleProduct } from "@app/types/IProduct";
import { Carousel } from "@temp/@next/components/containers";
import { ProductTileAUNA } from "@temp/@next/components/molecules";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { TypedFeaturedProductsQuery } from "@temp/components/ProductsFeatured/queries";
import { COLLECTIONS_PER_PAGE, PRODUCTS_PER_PAGE } from "@temp/core/config";
import { convertToSimpleProduct, generateProductUrl, maybe } from "@temp/core/utils";
import * as React from "react";
import "./scss/index.scss";
import { Skeleton } from "./skeleton";
import * as S from "./styles";
import { IHomePageCollecction, IProps } from "./types";
import { CollectionSortField } from "../../../gqlTypes/globalTypes";
import { OrderDirection } from "@sdk/gqlTypes/globalTypes";
import { useShowPersonalizedCollection } from "@temp/@next/optimizely/hooks";


const ProductsFeatured: React.FC<IProps> = ({
  productsOnCart,
  removeItemToCart,
  addToCart,
  subtractItemToCart,
}) => {

  const [districtSelected] = useDistrictSelected();
  const showPersonalizedCollection = useShowPersonalizedCollection();
  
  return (
    <TypedFeaturedProductsQuery
      displayError={false}
      loader={<Skeleton />}
      variables={{
        first: PRODUCTS_PER_PAGE,
        firstCollection: COLLECTIONS_PER_PAGE,
        districtId: districtSelected.id,
        sortBy: { direction: OrderDirection.ASC, field: CollectionSortField.SORT_ORDER },
      }}
    >
      {({ data }) => {
        const homepageCollections: IHomePageCollecction[] = data?.shop?.homepageCollections?.edges.length ?
          data.shop.homepageCollections.edges.map(it => ({
            id: it.node.id,
            name: it.node.name,
            products: it.node.products.edges.map(edge => ({ ...edge.node })),
          })) : [];

        const personalizedCollection: IHomePageCollecction[] = data?.personalized?.length && showPersonalizedCollection ?
          [{ id: "", isPersonalized: true, name: "Los recomendados para ti", products: data.personalized }] : [];

        const collections : IHomePageCollecction[] = personalizedCollection.concat(homepageCollections);

        if (collections) {
          return collections.map(collection => {
            const products: ISimpleProduct[] = maybe(
              () =>
                collection.products.map((product): ISimpleProduct => convertToSimpleProduct(product)),
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
                          isPersonalized={collection.isPersonalized}
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
        }
        else {
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
