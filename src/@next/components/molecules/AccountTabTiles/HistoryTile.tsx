import React from 'react';
import { Attribute, Tile } from '@components/atoms';
import * as S from './styles';
import shoppingbag from '@temp/images/shopping-bag.svg';
import { useOrdersByUser } from '@temp/@sdk/react';
import { Button } from '@farmacia-retail/farmauna-components';
import { useHistory } from 'react-router-dom';
import { orderHistoryUrl } from '@temp/@next/pages/AccountPage/paths';

export const ShoppingHistoryTile: React.FC = () => {

  const history = useHistory();

  const { data } = useOrdersByUser(
    {
      perPage: 1,
    },
    {
      fetchPolicy: "network-only",
    }
  );

  return (
    <S.TileWrapper>
      <Tile className="rounded-md">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mi última compra
            </S.HeaderSmall>

            {
              data?.edges?.length > 0 ? (<>
                <S.AttributeWrapper>
                  
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Attribute
                    description="Código de orden"
                    attributeValue={
                      `${data?.edges[0]?.node?.sequentialCode}` || ''
                    }
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Attribute
                    description="Estado"
                    attributeValue={
                      `${data?.edges[0]?.node?.customerStatusDisplay}` || ''
                    }
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => history.push(`${orderHistoryUrl + data?.edges[0]?.node?.token}`)}
                >
                  Ver detalles
                </Button>
              </S.AttributeWrapper>
              <S.AttributeWrapper>
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => history.push(orderHistoryUrl)}
                >
                  Ver todas mis compras
                </Button>
              </S.AttributeWrapper>
                </S.AttributeWrapper>
              </>) : (<>
                <S.AttributeWrapper>
                  <S.Image src={shoppingbag} alt="shopping" />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Attribute
                    description="No tienes compras registradas"
                    attributeValue=""
                  />
                </S.AttributeWrapper>
              </>)
            }

          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
