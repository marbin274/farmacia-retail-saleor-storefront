// import downArrowImg from "images/down-arrow-auna.svg"; //TODO: Use it as soon as we need to show more info
import { TaxedMoney } from "@components/containers";
import { CartSummaryRow, CartResume } from "@components/molecules";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  convertProductOnCartInProduct,
} from "@temp/@next/utils/products";
import {  smallScreen } from "@temp/@next/globalStyles/constants";

import cartSummaryMobileImg from "images/cart-summary-new.svg";
import closeCircleImg from "images/close-circle-small.svg";
import React, { useState } from "react";
import ReactSVG from "react-svg";
import * as S from "./styles";
import { ICostLine, IProps } from "./types";
import  Media  from 'react-media';

const CostLine = ({
  name,
  cost,
  last = false,
  negative = false,
}: ICostLine) => (
  <S.CostLine last={last}>
    <S.CostLineLabel>{name}</S.CostLineLabel>
    <span data-cy={`cartSummaryCost${name.replace(/\s/g, "")}`}>
      {negative && "- "}
      <TaxedMoney taxedMoney={cost} />
    </span>
  </S.CostLine>
);

/**
 * Cart summary displayed in checkout page
 */
const CartSummary: React.FC<IProps> = ({
  promoCode,
  products,
  subtotal,
  shipping,
  total,
  activeStepIndex,
  onClickHandle,
}: IProps) => {
  const [mobileCartOpened, setMobileCartOpened] = useState(false);

  const totalProducts: number = React.useMemo(()=>
  products?.reduce(
    (prevVal, currVal) => prevVal + currVal.quantity,
    0
  ) || 0, [products]);
  const CartSummaryTitle = (mobileCartOpened: boolean) => {  
    return <S.Title 
      data-cy="cartSummaryTitle"
      mobileCartOpened={mobileCartOpened}>
      Tu carrito{" "}
      {totalProducts && (
        <S.Text mobileCartOpened={mobileCartOpened}>
          {totalProducts || 0}{" "}
          {totalProducts === 1 ? "producto" : "productos"}
        </S.Text>
      )}
    </S.Title>
  }

  const mobileHeader = (mobileCartOpened: boolean) => {
    return  !mobileCartOpened? (
      <S.Block position={2}>
        <S.BadgeCartWrapper>
          <ReactSVG
            path={cartSummaryMobileImg}
            style={{ position: "relative" }}
          />
          {CartSummaryTitle(mobileCartOpened)}
        </S.BadgeCartWrapper>
      <S.ShowCart>
        Ver carrito
      </S.ShowCart>
    </S.Block>)
    : (
      <S.HeadClose mobileCartOpened={mobileCartOpened}>
         {CartSummaryTitle(mobileCartOpened)}
        <S.Close mobileCartOpened={mobileCartOpened}>
          <ReactSVG path={closeCircleImg} />
        </S.Close>
      </S.HeadClose>
    )
  }

  const desktopHeader = (mobileCartOpened: boolean) => {
    return <>
      <S.Title mobileCartOpened={mobileCartOpened} data-cy="cartSummaryTitle">
        Tu carrito ({totalProducts})
       </S.Title>
    </>
  }

  return (
    <S.CartSummaryContainer>
      <CartResume
        activeStepIndex={activeStepIndex}
        onClickHandle={onClickHandle} 
        promoPrice={promoCode}
        subTotalPrice={subtotal}
        shippingPrice={shipping}
        totalPrice={total}
        totalProducts={totalProducts}
      />
      <S.Wrapper mobileCartOpened={mobileCartOpened}>
        <S.Header
          onClick={() => setMobileCartOpened(!mobileCartOpened)}
          mobileCartOpened={mobileCartOpened}>
          <Media query={{ maxWidth: smallScreen }}>
            {(matches: any) =>
              matches ? (
                <>
                  <S.Block position={1}></S.Block>
                  {mobileHeader(mobileCartOpened)}
                </>
              ) : (desktopHeader(mobileCartOpened))}
          </Media>
        </S.Header>

        <S.Content>
          <S.HR />
          <S.CartSummaryProductList>
            {products?.map((product, index) => {
              const { canAddToCart } = checkProductCanAddToCart(convertProductOnCartInProduct(product), products);
              const isOnSale = checkProductIsOnSale(product);
              return (
                <div key={`${product.variant.sku}-${index}`}>
                  <S.ProductLine>
                    <CartSummaryRow
                      canAddToCart={canAddToCart}
                      index={index}
                      isOnSale={isOnSale}
                      sku={product?.variant?.sku || ""}
                      quantity={product?.quantity}
                      name={product?.name}
                      price={product?.variant?.pricing?.price}
                      thumbnail={product?.variant?.product?.thumbnail}
                    />
                  </S.ProductLine>
                  <S.HR />
                </div>
              );
            })}
            <S.HR />
          </S.CartSummaryProductList>
          {subtotal &&
            <S.CostTotalWrapper>
              <CostLine name="Subtotal" cost={subtotal} last={true} />
            </S.CostTotalWrapper>
          }
          
        </S.Content>
      </S.Wrapper>
    </S.CartSummaryContainer>

  );
};

export { CartSummary };
