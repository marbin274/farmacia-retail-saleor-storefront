import { TaxedMoney } from "@components/containers";
import { CachedImage } from "@components/molecules";
import { Overlay } from "@components/organisms";
import { CreateCheckout_checkoutCreate_checkoutErrors_products } from "@temp/@sdk/mutations/gqlTypes/CreateCheckout";
import { useCart } from "@temp/@sdk/react";
import { ICheckoutModelLine } from "@temp/@sdk/repository";
import { Button, Chip, GpsIcon } from "@farmacia-retail/farmauna-components";
import React, { FC } from "react";
import {
  ButtonsWrapper,
  Container,
  CurrentDistrict,
  Header,
  ImageBox,
  ProductImage,
  ProductInfo,
  ProductItem,
  ProductItemTop,
  ProductName,
  ProductNumerics,
  ProductsWrapper,
  Quantity,
  StockMessage,
  Title,
} from "./styles";
import { checkProductIsOnSale } from "@sdk/utils/products";

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
      const line = items.find((x) => x.variant.sku === product.sku);
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
    !finalProducts.find((x) => x.quantityAvailable > 0);

  const renderCartItems = () => {
    return finalProducts.map((item) => {
      const { line, quantityAvailable } = item;

      const hasQuantityAvailable = quantityAvailable > 0;
      const variantPrice = line.variant.pricing!.price!;

      const totalPrice = {
        gross: {
          ...variantPrice.gross,
          amount:
            variantPrice.gross.amount *
            (hasQuantityAvailable ? quantityAvailable : 1),
        },
        net: {
          ...variantPrice.net,
          amount:
            variantPrice.net.amount *
            (hasQuantityAvailable ? quantityAvailable : 1),
        },
      };
      const isOnSale = checkProductIsOnSale(line);

      return (
        <ProductItem key={line.id}>
          <ProductItemTop>
            <ProductImage>
              <ImageBox>
                <CachedImage {...line.variant.product?.thumbnail} />
              </ImageBox>
              {!hasQuantityAvailable && <Chip label="Agotado" disabled />}
            </ProductImage>
            <ProductInfo>
              <ProductName>{line.name}</ProductName>
              <ProductNumerics
                isOnSale={isOnSale}
                hasQuantityAvailable={hasQuantityAvailable}
              >
                {!allOutOfStock && (
                  <Quantity>
                    {hasQuantityAvailable ? quantityAvailable : ""}
                  </Quantity>
                )}

                <TaxedMoney taxedMoney={totalPrice} />
              </ProductNumerics>
            </ProductInfo>
          </ProductItemTop>
          {hasQuantityAvailable && (
            <StockMessage>
              <span>
                De {line.quantity} solo tenemos{" "}
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
                <p>Actualmente, tenemos algunos productos agotados en</p>
              <CurrentDistrict>
                <GpsIcon size={21} /> {district}
              </CurrentDistrict>
            </Title>
          </Header>
          <ProductsWrapper allOutOfStock={allOutOfStock}>
            {renderCartItems()}
          </ProductsWrapper>
          <ButtonsWrapper>
            {allOutOfStock ? (
              <Button onClick={onClickKeepSearching} size="large">
                Seguir buscando
              </Button>
            ) : (
              <>
                <p>
                  ¿Deseas continuar con los productos disponibles?
                </p>
                <Button onClick={onClickContinue} size="large">
                  Sí, continuar
                </Button>
                <Button
                  variant="outline"
                  onClick={onClickKeepSearching}
                  size="large"
                >
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
