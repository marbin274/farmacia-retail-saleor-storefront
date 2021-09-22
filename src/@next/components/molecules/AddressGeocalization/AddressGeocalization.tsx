import {
  useAddressGeocalizationInfo,
  useDistrictSelected,
} from '@temp/@next/hooks';
import React from 'react';
import { Button, GpsIcon } from '@farmacia-retail/farmauna-components';
import { addressGeoModalService } from '../AddressGeoModal/AddressGeoModalService';
import { AddressGeocalizationInfo } from './AddressGeocalizationInfo';
import * as S from './styles';
import { IProps } from './types';
import { useMediaQuery } from 'react-responsive';
import { largeScreen } from '@temp/@next/globalStyles/constants';

export const AddressGeocalization: React.FC<IProps> = React.memo(
  ({ mode = 'ligth' }) => {
    const [districtSelected] = useDistrictSelected();
    const [show] = useAddressGeocalizationInfo();

    const isDesktop = useMediaQuery({ query: `(min-width: ${largeScreen}px)` });

    const handleChangeAddress = () => {
      addressGeoModalService.show(true);
    };

    return (
      <>
        <S.Wrapper>
          <S.Localization mode={mode}>
            <S.GeocalizationIcon>
              <GpsIcon
                onClick={handleChangeAddress}
                size={isDesktop ? 32 : 24}
              />
            </S.GeocalizationIcon>
            <S.District className="district">
              <S.Label onClick={handleChangeAddress}>Enviar a: </S.Label>
              <S.Address className="district-name">
                {districtSelected.name}
              </S.Address>
            </S.District>
          </S.Localization>
          <S.Button className="button-border-change">
            <Button
              color="secondary"
              variant="outline"
              type="button"
              size="small"
              onClick={handleChangeAddress}
            >
              Cambiar
            </Button>
          </S.Button>
        </S.Wrapper>
        {!!show && <AddressGeocalizationInfo />}
      </>
    );
  }
);
