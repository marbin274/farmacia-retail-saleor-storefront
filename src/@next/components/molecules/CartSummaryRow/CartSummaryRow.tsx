import { TaxedMoney } from "@components/containers";
import { getProductPricingClass } from "@temp/@next/utils/products";
import React from "react";
import { CachedImage } from "../CachedImage";
import * as S from "./styles";
import { IProps } from "./types";

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
      <S.Name data-cy={`cartSummaryItem${index}Name`}>{name}</S.Name>
      <S.Sku>
        SKU <span data-cy={`cartSummaryItem${index}SKU`}>{sku}</span>
      </S.Sku>
      <S.Quantity>
        <span data-cy={`cartSummaryItem${index}Quantity`}>{quantity}</span>
      </S.Quantity>
      <S.Price data-cy={`cartSummaryItem${index}Price`}>
        <div className={getProductPricingClass(canAddToCart, isOnSale)}>
          <TaxedMoney taxedMoney={price} />
        </div>
      </S.Price>
      <S.Photo>
        <CachedImage data-cy={`cartSummaryItem${index}Image`} {...thumbnail} />
      </S.Photo>
    </S.Wrapper>
  );
};

export { CartSummaryRow };

