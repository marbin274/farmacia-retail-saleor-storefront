import { useOrdersByUser } from '@sdk/react/';
import React from 'react';

import { Loader } from '@components/atoms';
import { Button } from '@farmacia-retail/farmauna-components';
import { OrderTabel } from '@components/molecules';

import * as S from './styles';
import AccountLayout from '@app/pages/AccountPage/AccountLayout';

const ORDERS_PER_APICALL = 5;

export const OrdersHistory: React.FC = () => {
  const { data, loading, loadMore } = useOrdersByUser(
    {
      perPage: ORDERS_PER_APICALL,
    },
    {
      fetchPolicy: 'network-only',
    }
  );

  return (
    <AccountLayout>
      {loading && !data ? (
        <Loader />
      ) : (
        <S.Tile>
          <OrderTabel orders={data!.edges} />
          {data!.pageInfo.hasNextPage && (
            <S.Wrapper>
              <Button
                data-testid="load_more__button"
                onClick={() => {
                  loadMore({
                    after: data!.pageInfo.endCursor,
                    perPage: ORDERS_PER_APICALL,
                  });
                }}
                variant={'outline'}
              >
                Cargar más
              </Button>
            </S.Wrapper>
          )}
        </S.Tile>
      )}
    </AccountLayout>
  );
};
