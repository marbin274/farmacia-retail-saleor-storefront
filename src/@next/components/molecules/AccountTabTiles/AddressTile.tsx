import React from 'react';
import { Attribute, Tile } from '@components/atoms';
import * as S from './styles';
import { Button } from '@farmacia-retail/farmauna-components';
import { addressBookUrl } from '@temp/@next/pages/AccountPage/paths';
import { useUserDetails } from '@temp/@sdk/react';
import { useDistrictSelected } from '@temp/@next/hooks';
import { useRouter } from 'next/router';

export const MainAddressTile = () => {
  const { data: user } = useUserDetails();
  const [districtSelected] = useDistrictSelected();
  const router = useRouter();
  return (
    <S.TileWrapper>
      <Tile className="rounded-md">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mi dirección principal
            </S.HeaderSmall>

            {user?.defaultShippingAddress ? (
              <>
                <S.AttributeWrapper>
                  <img
                    className="fa-mx-auto"
                    src={'/assets/gps-icon-selected.svg'}
                    alt="gps"
                  />
                </S.AttributeWrapper>

                <div className="fa-text-highlight-medium fa-text-base fa-font-normal fa-text-center fa-mt-2 fa-mb-4">
                  {user?.defaultShippingAddress?.alias}
                </div>

                <S.AttributeWrapper>
                  <Attribute
                    description=""
                    attributeValue={districtSelected?.name || ''}
                  />
                </S.AttributeWrapper>

                <S.AttributeWrapper>
                  <Attribute
                    description=""
                    attributeValue={
                      user?.defaultShippingAddress.streetAddress1 || ''
                    }
                  />
                </S.AttributeWrapper>

                <S.AttributeWrapper>
                  <Attribute
                    description={
                      user?.defaultShippingAddress.streetAddress2 || ''
                    }
                    attributeValue=""
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => router.push(addressBookUrl)}
                  >
                    Ver todas mis direcciones
                  </Button>
                </S.AttributeWrapper>
              </>
            ) : (
              <>
                <S.AttributeWrapper>
                  <img
                    className="fa-mx-auto"
                    src={'/assets/gpsicon.svg'}
                    alt="gps"
                  />
                </S.AttributeWrapper>

                <S.AttributeWrapper>
                  <Attribute
                    description="Agrega una dirección de envío y tu compra será más rápida. "
                    attributeValue={''}
                  />
                </S.AttributeWrapper>
                <S.AttributeWrapper>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => router.push(addressBookUrl)}
                  >
                    Agregar dirección
                  </Button>
                </S.AttributeWrapper>
              </>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
