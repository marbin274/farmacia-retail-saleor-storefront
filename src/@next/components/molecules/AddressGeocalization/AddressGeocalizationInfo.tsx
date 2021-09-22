import React from 'react';
import * as S from './styles';
import { addressGeoModalService } from '../AddressGeoModal/AddressGeoModalService';
import { useAddressGeocalizationInfo } from '@temp/@next/hooks';
import { MODAL_ADDRESS_GEOLOCALIZATION_TIMEOUT } from '@temp/core/config';
import { useRouter } from 'next/router';

export const AddressGeocalizationInfo: React.FC = () => {
  const [, setShow] = useAddressGeocalizationInfo();
  const router = useRouter();

  const dontShowInfo =
    router.pathname.includes('account') ||
    router.pathname.includes('checkout') ||
    router.pathname.includes('order-finalized');

  const handleChangeAddress = () => {
    addressGeoModalService.show(true);
  };

  React.useEffect(() => {
    if (!dontShowInfo) {
      setTimeout(() => {
        setShow(false);
      }, MODAL_ADDRESS_GEOLOCALIZATION_TIMEOUT);
    }
  }, []);

  if (dontShowInfo) {
    return null;
  }

  return (
    <S.AlertWrapper data-testid="address-geolocalization">
      <S.Alert className="district--alert fa-bg-white fa-absolute fa-w-full fa-rounded-2xl fa-p-4">
        <div className="fa-flex fa-text-neutral-darkest">
          <S.AlertText className="fa-ml-4 fa-text-sm">
            <span className="fa-text-highlight-medium fa-font-semibold">
              ¡Hola!
            </span>{' '}
            aquí puedes{' '}
            <span
              className="fa-text-highlight-medium fa-cursor-pointer"
              onClick={handleChangeAddress}
            >
              cambiar el distrito
            </span>{' '}
            donde enviaremos tus productos.
          </S.AlertText>
        </div>
      </S.Alert>
    </S.AlertWrapper>
  );
};
