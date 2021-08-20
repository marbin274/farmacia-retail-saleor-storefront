import React from 'react';
import { Attribute, CCProviders, Tile, CreditCardIcon } from '@components/atoms';
import * as S from './styles';
import card from '@temp/images/card.svg';
import { Button } from '@farmacia-retail/farmauna-components';
import { useHistory } from 'react-router-dom';
import { orderHistoryUrl, paymentMethodsUrl } from '@temp/@next/pages/AccountPage/paths';
import { useUserDetails } from '@temp/@sdk/react';

export const MainCardTile: React.FC = () => {
  const { data: user } = useUserDetails();
  const history = useHistory();
  return (
    <S.TileWrapper>
      <Tile className="rounded-md">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mi tarjeta principal
            </S.HeaderSmall>

            {
              user?.cardTokens[0] ? (<>

                <S.AttributeWrapper>
                  <Attribute
                    description=""
                    attributeValue="¡Ya puedes pagar en un click!"
                  />
                </S.AttributeWrapper>

                <S.AttributeWrapper className="fa-rounded-lg fa-p-4 fa-shadow-lg fa-mb-4">
                  <S.AttributeWrapper>
                    <Attribute
                      description=""
                      attributeValue={user?.cardTokens[0]?.cardNumber}
                    />
                  </S.AttributeWrapper>


                  <S.AttributeWrapper className="fa-flex fa-justify-between">
                    <Attribute
                      description=""
                      attributeValue={user?.cardTokens[0]?.firstName + ' ' + user?.cardTokens[0]?.lastName}
                    />
                    <CreditCardIcon creditCardProvider={user?.cardTokens[0]?.brand as CCProviders} />
                  </S.AttributeWrapper>
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
              </>
              ) : (<>
                <S.AttributeWrapper>
                  <S.Image src={card} alt="card" />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Attribute
                    description="Agrega tu tarjeta de  débito/crédito y tu compra será más rápida."
                    attributeValue=""
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => history.push(paymentMethodsUrl)}
                  >
                    Agregar tarjeta
                  </Button>
                </S.AttributeWrapper>
              </>
              )
            }

          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
