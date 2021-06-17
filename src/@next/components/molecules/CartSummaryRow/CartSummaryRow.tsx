import { TaxedMoney } from "@components/containers";
import { getProductPricingClass } from "@temp/@next/utils/products";
import React from "react";
import { CachedImage } from "../CachedImage";
import * as S from "./styles";
import { IProps } from "./types";
import Media from "react-media";
import { smallScreen } from "@temp/@next/globalStyles/constants";

/**
 * Row with product to display in cart summary.
 */
const CartSummaryRow: React.FC<IProps> = ({
  canAddToCart,
  index,
  isOnSale,
  sku,
  name,
  price,
  quantity,
  thumbnail,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.WrapperProduct>
        <S.WrapperImage>
          <S.Photo>
            <CachedImage
              data-cy={`cartSummaryItem${index}Image`}
              {...thumbnail}
            />
          </S.Photo>
          <S.Quantity>
            <span data-cy={`cartSummaryItem${index}Quantity`}>{quantity}</span>
          </S.Quantity>
        </S.WrapperImage>
        <S.WrapperDetail>
          <S.Name data-cy={`cartSummaryItem${index}Name`}>{name}</S.Name>
          <Media
            query={{ maxWidth: smallScreen }}
            render={() => (
              <S.Price data-cy={`cartSummaryItem${index}Price`}>
                <div className={getProductPricingClass(canAddToCart, isOnSale)}>
                  <TaxedMoney taxedMoney={price} />
                </div>
              </S.Price>
            )}
          ></Media>
        </S.WrapperDetail>
      </S.WrapperProduct>
      <Media
        query={{ minWidth: smallScreen }}
        render={() => (
          <S.Price data-cy={`cartSummaryItem${index}Price`}>
            <div className={getProductPricingClass(canAddToCart, isOnSale)}>
              <TaxedMoney taxedMoney={price} />
            </div>
          </S.Price>
        )}
      ></Media>
    </S.Wrapper>
  );
};

export { CartSummaryRow };
