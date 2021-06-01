import React, { FC } from "react";
import { Button, IconButton } from "@components/atoms";
import { CachedImage } from "@components/molecules";
import { Overlay } from "@components/organisms";
import { TaxedMoney } from "@components/containers";
import { turquoise } from "@temp/@next/globalStyles/constants";
import GpsIcon from "images/gps.svg";
import {
  Container,
  Header,
  Title,
  CloseIcon,
  CurrentDistrict,
  ProductsWrapper,
  ProductItemTop,
  ProductInfo,
  ProductImage,
  ProductNumerics,
  Quantity,
  ProductName,
  NoStock,
  ProductItem,
  StockMessage,
  ButtonsWrapper,
} from "./styles";
import { useCart } from "@temp/@sdk/react";
import { ICheckoutModelLine } from "@temp/@sdk/repository";
import { CreateCheckout_checkoutCreate_checkoutErrors_products } from "@temp/@sdk/mutations/gqlTypes/CreateCheckout";

type IStockValidationModalProps = {
  show: boolean;
  onClose: () => void;
  target?: HTMLElement | null;
  onClickContinue?: () => void;
  onClickKeepSearching?: () => void;
  products?: CreateCheckout_checkoutCreate_checkoutErrors_products[];
  district: string;
};

export const StockValidationModal: FC<IStockValidationModalProps> = ({
  district,
  onClickContinue,
  onClickKeepSearching,
  onClose,
  products = [],
  show,
  target,
}) => {
  const { items } = useCart();

  const getProducts = () => {
    const outOfStockProducts: {
      quantityAvailable: number;
      line: ICheckoutModelLine;
    }[] = [];

    if (!items) {
      return outOfStockProducts;
    }

    for (const product of products) {
      const line = items.find(x => x.variant.sku === product.sku);
      if (!line) continue;

      outOfStockProducts.push({
        line,
        quantityAvailable: product.quantityAvailable!,
      });
    }

    return outOfStockProducts;
  };

  const finalProducts = getProducts();

  const allOutOfStock =
    items?.length === finalProducts?.length &&
    !finalProducts.find(x => x.quantityAvailable > 0);

  const renderCartItems = () => {
    return finalProducts.map(item => {
      const { line, quantityAvailable } = item;

      let totalPrice;

      if (quantityAvailable > 0) {
        const variantPrice = line.variant.pricing!.price!;
        totalPrice = {
          gross: {
            ...variantPrice.gross,
            amount: variantPrice.gross.amount * quantityAvailable,
          },
          net: {
            ...variantPrice.net,
            amount: variantPrice.net.amount * quantityAvailable,
          },
        };
      }

      return (
        <ProductItem key={line.id}>
          <ProductItemTop>
            <ProductImage>
              <CachedImage {...line.variant.product?.thumbnail} />
            </ProductImage>
            <ProductInfo>
              <ProductName>{line.name}</ProductName>
              {quantityAvailable > 0 ? (
                <ProductNumerics>
                  <Quantity>{quantityAvailable}</Quantity>
                  <TaxedMoney taxedMoney={totalPrice} />
                </ProductNumerics>
              ) : (
                <NoStock>Agotado</NoStock>
              )}
            </ProductInfo>
          </ProductItemTop>
          {quantityAvailable > 0 && (
            <StockMessage>
              <span>
                De <span>{line.quantity}</span> solo tenemos{" "}
                <span>{quantityAvailable} disponibles</span>
              </span>
            </StockMessage>
          )}
        </ProductItem>
      );
    });
  };

  return (
    <Overlay position="center" show={show} target={target}>
      {show && (
        <Container>
          <Header>
            <Title>
              <div>
                {allOutOfStock
                  ? "Productos agotados en"
                  : "Tenemos pocos productos en"}
              </div>
              <CurrentDistrict>
                <img src={GpsIcon} /> {district}
              </CurrentDistrict>
            </Title>
            {allOutOfStock && (
              <CloseIcon>
                <IconButton
                  name="x"
                  color={turquoise}
                  size={19}
                  onClick={onClose}
                />
              </CloseIcon>
            )}
          </Header>
          <ProductsWrapper allOutOfStock={allOutOfStock}>
            {renderCartItems()}
          </ProductsWrapper>
          <ButtonsWrapper>
            {allOutOfStock ? (
              <Button onClick={onClickKeepSearching}>Seguir buscando</Button>
            ) : (
              <>
                <p>
                  ¿Deseas finalizar tu compra con los productos disponibles?
                </p>
                <Button onClick={onClickContinue}>Sí, continuar</Button>
                <Button outline onClick={onClickKeepSearching}>
                  Seguir buscando
                </Button>
              </>
            )}
          </ButtonsWrapper>
        </Container>
      )}
    </Overlay>
  );
};
