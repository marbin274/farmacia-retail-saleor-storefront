// import downArrowImg from "images/down-arrow-auna.svg"; //TODO: Use it as soon as we need to show more info
import { TaxedMoney } from "@components/containers";
import { CartSummaryRow } from "@components/molecules";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
} from "@temp/@next/utils/products";
import cartSummaryImg from "images/cart-summary-new.svg";
import closeImg from "images/close-circle-small.svg";
import React, { useState } from "react";
import ReactSVG from "react-svg";
import * as S from "./styles";
import { ICostLine, ICosts, IProps } from "./types";

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

  return (
    <S.Wrapper mobileCartOpened={mobileCartOpened}>
      <S.Header 
        onClick={() => setMobileCartOpened(!mobileCartOpened)}
        mobileCartOpened={mobileCartOpened}>
        <S.Block position={1}>
         
        </S.Block>
        { !mobileCartOpened? (
          <S.Block position={2}>
            <S.BadgeCartWrapper>
              <ReactSVG
                path={cartSummaryImg}
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
              <ReactSVG path={closeImg} />
            </S.Close>
          </S.HeadClose>
        )}
      </S.Header>

      <S.Content>
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
