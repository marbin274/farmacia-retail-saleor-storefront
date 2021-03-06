import { Button, CartFooter, CartHeader } from '@components/atoms';
import { TaxedMoney } from '@components/containers';
import { CartRow } from '@components/organisms';
import { Cart, CartEmpty } from '@components/templates';
import { IItems } from '@sdk/api/Cart/types';
import { UserDetails_me } from '@sdk/queries/gqlTypes/UserDetails';
import { useCart, useCheckout, useUserDetails } from '@sdk/react';
import { BASE_URL } from '@temp/core/config';
import { ITaxedMoney } from '@types';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { IProps } from './types';

const title = <h1 data-cy="cartPageTitle">My Cart</h1>;

const getShoppingButton = (router: NextRouter) => (
  <Button
    data-cy="cartPageBtnContinueShopping"
    onClick={() => router.push(BASE_URL)}
  >
    CONTINUE SHOPPING
  </Button>
);

const getCheckoutButton = (router: NextRouter, user: UserDetails_me | null) => (
  <Button
    data-cy="cartPageBtnProceedToCheckout"
    onClick={() => router.push(user ? `/checkout/` : `/login/`)}
  >
    PROCEED TO CHECKOUT
  </Button>
);

const cartHeader = <CartHeader />;

const prepareCartFooter = (
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null
) => (
  <CartFooter
    subtotalPrice={
      <TaxedMoney data-cy="cartPageSubtotalPrice" taxedMoney={subtotalPrice} />
    }
    totalPrice={
      <TaxedMoney data-cy="cartPageTotalPrice" taxedMoney={totalPrice} />
    }
    shippingPrice={
      shippingTaxedPrice &&
      shippingTaxedPrice.gross!.amount !== 0 && (
        <TaxedMoney
          data-cy="cartPageShippingPrice"
          taxedMoney={shippingTaxedPrice}
        />
      )
    }
    discountPrice={
      promoTaxedPrice &&
      promoTaxedPrice.gross!.amount !== 0 && (
        <TaxedMoney
          data-cy="cartPageShippingPrice"
          taxedMoney={promoTaxedPrice}
        />
      )
    }
  />
);

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
) => {
  return items?.map(({ id, variant, quantity, totalPrice }, index) => (
    <CartRow
      key={id ? `id-${id}` : `idx-${index}`}
      index={index}
      name={variant?.product?.name || ''}
      maxQuantity={variant.quantityAvailable || quantity}
      quantity={quantity}
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={(quantity) => updateItem(variant.id, quantity)}
      thumbnail={{
        ...variant?.product?.thumbnail,
        alt: variant?.product?.thumbnail?.alt || '',
      }}
      totalPrice={
        <TaxedMoney
          data-cy={`cartPageItem${index}TotalPrice`}
          taxedMoney={totalPrice}
        />
      }
      unitPrice={
        <TaxedMoney
          data-cy={`cartPageItem${index}UnitPrice`}
          taxedMoney={variant?.pricing?.price}
        />
      }
      sku={variant.sku}
      attributes={variant.attributes?.map((attribute) => {
        return {
          attribute: {
            id: attribute.attribute.id,
            name: attribute.attribute.name || '',
          },
          values: attribute.values.map((value) => {
            return {
              id: value?.id,
              name: value?.name || '',
              value: value?.value,
            };
          }),
        };
      })}
    />
  ));
};

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const router = useRouter();
  const { data: user } = useUserDetails();
  const { checkout } = useCheckout();
  const {
    loaded,
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
  } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  return loaded && items?.length ? (
    <Cart
      title={title}
      button={getCheckoutButton(router, user)}
      cartHeader={cartHeader}
      cartFooter={prepareCartFooter(
        totalPrice,
        shippingTaxedPrice,
        promoTaxedPrice,
        subtotalPrice
      )}
      cart={items && generateCart(items, removeItem, updateItem)}
    />
  ) : (
    <CartEmpty button={getShoppingButton(router)} />
  );
};
