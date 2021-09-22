import { TaxedMoney } from '@components/containers';
import { Button, CartIcon } from '@farmacia-retail/farmauna-components';
import { useCart, useCheckout, useUserDetails } from '@temp/@sdk/react';
import { checkoutLoginUrl, checkoutUrl } from '@temp/app/routes';
import * as React from 'react';
import { useRouter } from 'next/router';
import * as S from './FooterStyles';
interface IProps {
  hideOverlay(): void;
}

export const Footer: React.FC<IProps> = ({ hideOverlay }) => {
  const router = useRouter();
  const { data: user } = useUserDetails();
  const { checkout } = useCheckout();
  const { discount, shippingPrice, subtotalPrice, totalPrice } = useCart();

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

  const onClickBuyIcon = () => {
    const isInLoginPage = router.pathname.includes('login');
    hideOverlay();
    if (isInLoginPage) return;
    else {
      const urlToGo =
        user || (checkout && checkout.id) ? checkoutUrl : checkoutLoginUrl;
      router.push(urlToGo);
    }
  };

  return (
    <S.Container>
      <S.Details>
        <S.DetailsPrice>
          <S.SubTotalLabel>Subtotal:</S.SubTotalLabel>
          <span>
            <TaxedMoney
              data-cy="cartPageSubtotalPrice"
              taxedMoney={subtotalPrice}
            />
          </span>
        </S.DetailsPrice>

        {shippingTaxedPrice && shippingTaxedPrice.gross.amount !== 0 && (
          <S.DetailsPrice>
            <S.SubTotalLabel>Shipping:</S.SubTotalLabel>
            <span>
              <TaxedMoney
                data-cy="cartPageShippingPrice"
                taxedMoney={shippingTaxedPrice}
              />
            </span>
          </S.DetailsPrice>
        )}

        {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
          <S.DetailsPrice>
            <S.SubTotalLabel>Promo code:</S.SubTotalLabel>
            <span>
              <TaxedMoney
                data-cy="cartPagePromoCodePrice"
                negative
                taxedMoney={promoTaxedPrice}
              />
            </span>
          </S.DetailsPrice>
        )}

        <S.DetailsPriceTotal>
          <S.TotalLabel>Total:</S.TotalLabel>
          <S.TotalPrice>
            <TaxedMoney data-cy="cartPageTotalPrice" taxedMoney={totalPrice} />
          </S.TotalPrice>
        </S.DetailsPriceTotal>
      </S.Details>
      <S.ButtonContainer>
        <Button icon={<CartIcon />} size="large" onClick={onClickBuyIcon}>
          Comprar
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};
