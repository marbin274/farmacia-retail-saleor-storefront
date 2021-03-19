// import downArrowImg from "images/down-arrow-auna.svg"; //TODO: Use it as soon as we need to show more info
import { TaxedMoney } from "@components/containers";
import { CartSummaryRow } from "@components/molecules";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
} from "@temp/@next/utils/products";
import {  smallScreen } from "@temp/@next/globalStyles/constants";

import cartSummaryMobileImg from "images/cart-summary-new.svg";
import closeCircleImg from "images/close-circle-small.svg";
import cartSummaryImg from "images/cart-summary.svg";
import React, { useState } from "react";
import ReactSVG from "react-svg";
import * as S from "./styles";
import { ICostLine, ICosts, IProps } from "./types";
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

const Costs = ({ promoCode, shipping, total }: ICosts) => (
  <S.Costs>
    {shipping && <CostLine name="Costo delivery" cost={shipping} />}
    {promoCode && promoCode.gross!.amount > 0 && (
      <CostLine name="Promo Code" cost={promoCode} negative={true} />
    )}
    {total && <CostLine name="Total" cost={total} last={true} />}
  </S.Costs>
);

/**
 * Cart summary displayed in checkout page
 */
const CartSummary: React.FC<IProps> = ({
  total,
  shipping,
  promoCode,
  products,
}: IProps) => {
  const [mobileCartOpened, setMobileCartOpened] = useState(false);

  const totalProducts = products?.reduce(
    (prevVal, currVal) => prevVal + currVal.quantity,
    0
  );

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
            Tu carrito{" "}
            {totalProducts && (
              <S.Text mobileCartOpened={mobileCartOpened}>
                {totalProducts || 0}{" "}
                {totalProducts === 1 ? "producto" : "productos"}
              </S.Text>
            )}
          </S.Title>
          <ReactSVG
            path={cartSummaryImg}
            style={{ left: "16px", position: "relative" }}
          />
    </>
  }

  return (
    <S.Wrapper mobileCartOpened={mobileCartOpened}>
      <S.Header 
        onClick={() => setMobileCartOpened(!mobileCartOpened)}
        mobileCartOpened={mobileCartOpened}>
        <Media query={{ maxWidth: smallScreen }}>
                {(matches: any )=>
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
            const {canAddToCart} = checkProductCanAddToCart(product, products);
            const isOnSale = checkProductIsOnSale(product);
            return (
              <div key={product.variant.sku}>
                <S.ProductLine>
                  <CartSummaryRow
                    canAddToCart={canAddToCart}
                    index={index}
                    isOnSale={isOnSale}
                    sku={product.variant.sku || ""}
                    quantity={product.quantity}
                    name={product.name}
                    price={product.variant.pricing?.price}
                    thumbnail={product.variant.product?.thumbnail}
                  />
                </S.ProductLine>
                <S.HR />
              </div>
            );
          })}
          {/* <S.CartModifier>
            <S.Link>Modificar carrito</S.Link>
            <S.Link type="button">
              ver todos <ReactSVG path={downArrowImg} />
            </S.Link>
          </S.CartModifier> */}
          <S.HR />
        </S.CartSummaryProductList>
        <Costs total={total} shipping={shipping} promoCode={promoCode} />
      </S.Content>
    </S.Wrapper>
  );
};

export { CartSummary };
