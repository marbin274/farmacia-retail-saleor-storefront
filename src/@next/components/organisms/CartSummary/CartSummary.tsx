import { TaxedMoney } from "@components/containers";
import { CartResume, CartSummaryRow } from "@components/molecules";
import { smallScreen } from "@temp/@next/globalStyles/constants";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
} from "@sdk/utils/products";
import {
  convertProductOnCartInProduct,
} from "@temp/@next/utils/products"
import { Button, CartIcon, XIcon } from "@farmacia-retail/farmauna-components";
import React, { useState } from "react";
import Media from "react-media";
import * as S from "./styles";
import { ICostLine, IProps } from "./types";

const CostLine = ({
  name,
  cost,
  last = false,
}: ICostLine) => (
  <S.CostLine last={last}>
    <S.CostLineLabel>{name}</S.CostLineLabel>
    <span data-cy={`cartSummaryCost${name.replace(/\s/g, "")}`}>
      <TaxedMoney negative taxedMoney={cost} />
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
  const totalProducts: number = React.useMemo(
    () =>
      products?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) ||
      0,
    [products]
  );
  const [mobileCartOpened, setMobileCartOpened] = useState(false);

  const CartSummaryTitle = (mobileCartOpened: boolean) => {
    return (
      <S.Title mobileCartOpened={mobileCartOpened} data-cy="cartSummaryTitle">
        <S.TitleIcon>
          <CartIcon />
        </S.TitleIcon>
        <S.TitleText>
          <span>Tu carrito</span>
          <span>
            {totalProducts} {totalProducts === 1 ? "producto" : "productos"} en
            total
          </span>
        </S.TitleText>
      </S.Title>
    );
  };

  const mobileHeader = (mobileCartOpened: boolean) => {
    return !mobileCartOpened ? (
      <S.Block position={2}>
        {CartSummaryTitle(mobileCartOpened)}
        <Button variant="outline" size="small">
          Ver carrito
        </Button>
      </S.Block>
    ) : (
      <S.HeadClose mobileCartOpened={mobileCartOpened}>
        {CartSummaryTitle(mobileCartOpened)}
        <S.Close mobileCartOpened={mobileCartOpened}>
          <XIcon size={12} />
        </S.Close>
      </S.HeadClose>
    );
  };

  const desktopHeader = (mobileCartOpened: boolean) => {
    return (
      <>
        <S.Title mobileCartOpened={mobileCartOpened} data-cy="cartSummaryTitle">
          <S.TitleIcon>
            <CartIcon />
          </S.TitleIcon>
          <S.TitleText>
            <span>Tu carrito</span>
            <span>
              {totalProducts} {totalProducts === 1 ? "producto" : "productos"}{" "}
              en total
            </span>
          </S.TitleText>
        </S.Title>
      </>
    );
  };

  return (
    <S.CartSummaryContainer>
      <S.Wrapper mobileCartOpened={mobileCartOpened}>
        <S.Header
          onClick={() => setMobileCartOpened(!mobileCartOpened)}
          mobileCartOpened={mobileCartOpened}
        >
          <Media query={{ maxWidth: smallScreen }}>
            {(matches: any) =>
              matches ? (
                <>
                  {/* <S.Block position={1}></S.Block> */}
                  {mobileHeader(mobileCartOpened)}
                </>
              ) : (
                desktopHeader(mobileCartOpened)
              )
            }
          </Media>
        </S.Header>

        <S.Content>
          <S.CartSummaryProductList>
            {products?.map((product, index) => {
              const { canAddToCart } = checkProductCanAddToCart(
                convertProductOnCartInProduct(product),
                products
              );
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
                </div>
              );
            })}
          </S.CartSummaryProductList>
          {total && (
            <S.CostTotalWrapper>
              <CostLine name="Total" cost={total} last={true} />
            </S.CostTotalWrapper>
          )}
        </S.Content>
        <Media
          query={{ minWidth: smallScreen }}
          render={() => (
            <>
              <hr></hr>
              <CartResume
                activeStepIndex={activeStepIndex}
                onClickHandle={onClickHandle}
                promoPrice={promoCode}
                subTotalPrice={subtotal}
                shippingPrice={shipping}
                totalPrice={total}
                totalProducts={totalProducts}
              />
            </>
          )}
        />
      </S.Wrapper>
    </S.CartSummaryContainer>
  );
};

export { CartSummary };
