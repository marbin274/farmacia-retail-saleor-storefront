import { Alert } from '@temp/@next/components/atoms/Alert';
import { ItemsNotification } from '@temp/@next/components/atoms/ItemsNotification';
import { AddressGeoModal } from '@temp/@next/components/molecules/AddressGeoModal/AddressGeoModal';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';
import { useUpdateCartLines } from '@temp/@next/hooks/useUpdateCartLines';
import { SearchNetworkResult } from '@temp/components/OverlayManager/Search';
import es from 'date-fns/locale/es';
import React from 'react';
import { registerLocale } from 'react-datepicker';
import { Footer, MetaConsumer, OverlayManager } from '../components';
import '../globalStyles/scss/index.scss';
import { Header } from './Header';

import { Routes } from './routes';

registerLocale('es', es);

const App: React.FC = () => {
  const { update: updateCartLines } = useUpdateCartLines();
  const [district, setDistrict] = useDistrictSelected();

  React.useEffect(() => {
    (window as any).updateCartLines = () => {
      updateCartLines();
    };
    (window as any).updateDistrict = (district) => {
      setDistrict(district);
    };
  });

  React.useEffect(() => {
    if (district && !window?.location?.pathname.includes('/checkout/')) {
      updateCartLines();
    }
  }, [district]);

  return (
    <>
      <ItemsNotification />
      <Alert />
      <AddressGeoModal />
      <SearchNetworkResult />
      <MetaConsumer />
      <Header />
      <Routes />
      <Footer />
      <OverlayManager />
    </>
  );
};

export default App;
