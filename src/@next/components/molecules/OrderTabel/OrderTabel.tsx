import React from "react";
import Media from "react-media";
import { ThemeContext } from "styled-components";
import { Button } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import arrowImg from "images/breadcrumbs-arrow.svg";

import { Thumbnail } from "..";
import { generateProductUrl, translateOrderStatus } from "@temp/core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const header = (matches: boolean) => (
  <S.HeaderRow>
    <S.IndexNumber># Orden</S.IndexNumber>
    {matches && (
      <>
        <S.ProductsOrdered>Productos</S.ProductsOrdered>
        <S.DateOfOrder>Fecha de la compra</S.DateOfOrder>
        <S.Value>Total</S.Value>
      </>
    )}
    <S.Status>Estado</S.Status>
    <S.Action />
  </S.HeaderRow>
);

export const OrderTabel: React.FC<IProps> = ({ orders, history }: IProps) => {
  const theme = React.useContext(ThemeContext);
  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {(matches: boolean) => {
          return (
            <>
              {header(matches)}
              {orders &&
                orders.map(order => {
                  const date = new Date(order.node.created);
                  return (
                    <S.Row
                      data-testid="order__row"
                      key={order.node.number}
                      onClick={(evt: { stopPropagation: () => void }) => {
                        evt.stopPropagation();
                        history.push(`/order-history/${order.node.token}`);
                      }}
                    >
                      <S.IndexNumber>{order.node.number}</S.IndexNumber>
                      {matches ? (
                        <>
                          <S.ProductsOrdered>
                            {order.node.lines
                              .slice(0, 5)
                              .map((product: any) => (
                                <span
                                  key={product.variant.product.id}
                                  onClick={evt => {
                                    evt.stopPropagation();
                                    history.push(
                                      generateProductUrl(
                                        product.variant.product.id,
                                        product.variant.product.name
                                      )
                                    );
                                  }}
                                >
                                  <Thumbnail source={product} />
                                </span>
                              ))}
                          </S.ProductsOrdered>
                          <S.DateOfOrder>
                            {`${date.getMonth() +
                              1}/${date.getDate()}/${date.getFullYear()}`}
                          </S.DateOfOrder>
                          <S.Value>
                            <TaxedMoney taxedMoney={order.node.total} />
                          </S.Value>
                        </>
                      ) : (
                        ""
                      )}
                      <S.Status>
                        {translateOrderStatus(
                          order.node.status,
                          order.node.statusDisplay
                        )}
                      </S.Status>
                      <S.Action>
                        {matches ? (
                          <Button size="sm">Ver detalle</Button>
                        ) : (
                          <img src={arrowImg} />
                        )}
                      </S.Action>
                    </S.Row>
                  );
                })}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
