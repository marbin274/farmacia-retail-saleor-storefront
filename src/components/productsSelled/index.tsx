import { ProductTileHorizontalAUNA } from "@temp/@next/components/molecules";
import { useDistrictSelected } from "@temp/@next/hooks";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import { convertToSimpleProduct, generateProductUrl } from "@temp/core/utils";
import { ReportingPeriod } from "../../../gqlTypes/globalTypes";
import React from "react";
import { TypedSelledProductsQuery } from "./queries";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductsSelled: React.FC<IProps> = ({
  productDetail,
  productsOnCart,
  removeItemToCart,
  addToCart,
  subtractItemToCart,
}) => {
  const [districtSelected] = useDistrictSelected();
  return (
    <TypedSelledProductsQuery
      displayError={false}
      variables={{
        districtId: districtSelected.id,
        first: PRODUCTS_PER_PAGE,
        period: ReportingPeriod.THIS_MONTH,
      }}
    >
      {({ data }) => {
        if (data?.reportProductSales?.edges?.length) {
          const products: ISimpleProduct[] = data.reportProductSales.edges.reduce(
            (prev: ISimpleProduct[], act) => {
              if (!productDetail || productDetail.id !== act.node.product.id) {
                prev.push(convertToSimpleProduct(act.node.product));
              }
              return prev;
            },
            []
          );

          return (
            <div className="products-selled">
              <S.Container>
                <S.Title>Top más vendidos</S.Title>
                {getProductsWithQuantity(products, productsOnCart).map(
                  product => (
                    <ProductTileHorizontalAUNA
                      key={product.id}
                      addToCart={addToCart}
                      removeItemToCart={removeItemToCart}
                      subtractItemToCart={subtractItemToCart}
                      product={product}
                      productsOnCart={productsOnCart}
                      productUrl={generateProductUrl(product.id, product.name)}
                    />
                  )
                )}
              </S.Container>
            </div>
          );
        } else {
          return null;
        }
      }}
    </TypedSelledProductsQuery>
  );
};
