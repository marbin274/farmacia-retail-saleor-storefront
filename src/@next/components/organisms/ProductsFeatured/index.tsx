import { CollectionSortField, OrderDirection } from '@sdk/gqlTypes/globalTypes';
import { ISimpleProduct } from '@sdk/types/IProduct';
import { getProductsWithQuantity } from '@sdk/utils/products';
import { Carousel } from '@temp/@next/components/containers';
import { ProductTileAUNA } from '@temp/@next/components/molecules';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';
import { useFeaturedProducts } from '@temp/@sdk/react';
import {
  COLLECTIONS_PER_PAGE,
  PRODUCTS_PER_PAGE,
  PRODUCTS_PER_PAGE_PERSONALIZE,
} from '@temp/core/config';
import {
  convertToSimpleProduct,
  generateProductUrl,
  maybe,
} from '@temp/core/utils';
import * as React from 'react';
import { Skeleton } from './skeleton';
import * as S from './styles';
import { IHomePageCollecction, IProps } from './types';

export const ProductsFeatured: React.FC<IProps> = ({
  productsOnCart,
  removeItemToCart,
  addToCart,
  subtractItemToCart,
}) => {
  const [districtSelected] = useDistrictSelected();
  const { data, loading } = useFeaturedProducts(
    {
      first: PRODUCTS_PER_PAGE,
      firstPersonalize: PRODUCTS_PER_PAGE_PERSONALIZE,
      firstCollection: COLLECTIONS_PER_PAGE,
      districtId: districtSelected.id,
      sortBy: {
        direction: OrderDirection.ASC,
        field: CollectionSortField.SORT_ORDER,
      },
    },
    { fetchPolicy: 'cache-and-network' }
  );

  if (loading) return <Skeleton />;

  const homepageCollections: IHomePageCollecction[] = data?.shop
    ?.homepageCollections?.edges.length
    ? data.shop.homepageCollections.edges.map((it) => ({
        id: it.node.id,
        name: it.node.name,
        products: it.node.products.edges.map((edge) => ({
          ...edge.node,
        })),
      }))
    : [];

  const personalizedCollection: IHomePageCollecction[] = data?.personalized
    ?.length
    ? [
        {
          id: '',
          name: 'Los recomendados para ti',
          products: data.personalized,
        },
      ]
    : [];

  const collections: IHomePageCollecction[] =
    personalizedCollection.concat(homepageCollections);

  if (!collections) return null;

  return (
    <>
      {collections.map((collection) => {
        const products: ISimpleProduct[] = maybe(
          () =>
            collection.products.map(
              (product): ISimpleProduct => convertToSimpleProduct(product)
            ),
          []
        );
        return (
          <S.Container key={collection.id} className="fa-my-0 fa-mx-auto">
            <S.InnerContainer>
              <S.CollectionName>{collection.name}</S.CollectionName>
            </S.InnerContainer>
            <Carousel>
              {getProductsWithQuantity(products, productsOnCart).map(
                (product) => (
                  <ProductTileAUNA
                    key={product.id}
                    addToCart={addToCart}
                    removeItemToCart={removeItemToCart}
                    subtractItemToCart={subtractItemToCart}
                    product={product}
                    productsOnCart={productsOnCart}
                    productUrl={generateProductUrl(product.id, product.name)}
                    isPersonalizeProduct={
                      collection.name === 'Los recomendados para ti'
                        ? true
                        : false
                    }
                  />
                )
              )}
            </Carousel>
          </S.Container>
        );
      })}
    </>
  );
};
