import { Carousel } from "@temp/@next/components/containers";
import { ProductTileAUNA } from "@temp/@next/components/molecules";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import { generateProductUrl } from "@temp/core/utils";
import { ReportingPeriod } from "gqlTypes/globalTypes";
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
    return (
        <TypedSelledProductsQuery
            displayError={false}
            variables={{ 
                first: PRODUCTS_PER_PAGE,
                period: ReportingPeriod.THIS_MONTH,
             }}
        >
            {({ data }) => {
                if (data?.reportProductSales?.edges?.length) {

                    const products: ISimpleProduct[] = data.reportProductSales.edges.reduce((prev, act)=>{
                        if(!productDetail || productDetail.id !== act.node.product.id){                            
                            prev.push(act.node.product);
                        }
                        return prev;
                    },[])
                
                    return (
                        <div className="products-selled">
                            <S.Container>
                                <S.Title>TOP MÁS VENDIDOS</S.Title>
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
                } else {
                    return null;
                }
            }}
        </TypedSelledProductsQuery>
    );
};

