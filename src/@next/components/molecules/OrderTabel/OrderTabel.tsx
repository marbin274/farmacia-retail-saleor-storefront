import { ArrowRightIcon, Button } from '@farmacia-retail/farmauna-components';
import { TaxedMoney } from '@components/containers';
import { generateProductUrl } from '@temp/core/utils';
import React from 'react';
import Media from 'react-media';
import { ThemeContext } from 'styled-components';
import { Thumbnail } from '..';
import * as S from './styles';
import { IProps } from './types';
import { orderHistoryUrl } from '@app/pages/AccountPage/paths';
import { useRouter } from 'next/router';

const header = (matches: boolean) => (
  <S.HeaderRow>
    <S.IndexNumber>Código de orden</S.IndexNumber>
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

export const OrderTabel: React.FC<IProps> = ({ orders }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const router = useRouter();

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
                orders.map((order) => {
                  const date = new Date(order.node.created);
                  return (
                    <S.Row
                      data-testid="order__row"
                      key={order.node.number}
                      onClick={(evt: { stopPropagation: () => void }) => {
                        evt.stopPropagation();
                        router.push(`${orderHistoryUrl + order.node.token}`);
                      }}
                    >
                      <S.IndexNumber>{order.node.sequentialCode}</S.IndexNumber>
                      {matches ? (
                        <>
                          <S.ProductsOrdered>
                            {order.node.lines
                              .slice(0, 2)
                              .map((product: any) => (
                                <span
                                  className="fa-flex fa-items-center fa-justify-center fa-w-10 fa-h-10 fa-bg-white fa-text-neutral-darkest fa-text-sm fa-font-normal fa-rounded-lg"
                                  key={product.variant.productId}
                                  onClick={(evt) => {
                                    evt.stopPropagation();
                                    router.push(
                                      generateProductUrl(
                                        product.variant.productId,
                                        product.productName
                                      )
                                    );
                                  }}
                                >
                                  <Thumbnail source={product} />
                                </span>
                              ))}
                            {order.node.lines.length > 2 && (
                              <span className="fa-flex fa-items-center fa-justify-center fa-w-10 fa-h-10 fa-bg-white fa-text-neutral-darkest fa-text-sm fa-font-normal fa-rounded-lg">
                                + {order.node.lines.length - 2}
                              </span>
                            )}
                          </S.ProductsOrdered>
                          <S.DateOfOrder>
                            {`${
                              date.getMonth() + 1
                            }/${date.getDate()}/${date.getFullYear()}`}
                          </S.DateOfOrder>
                          <S.Value>
                            <TaxedMoney taxedMoney={order.node.total} />
                          </S.Value>
                        </>
                      ) : (
                        ''
                      )}
                      <S.Status>{order.node.customerStatusDisplay}</S.Status>
                      <S.Action>
                        <Button
                          icon={<ArrowRightIcon size={16} />}
                          size="small"
                          iconOnly
                        />
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
