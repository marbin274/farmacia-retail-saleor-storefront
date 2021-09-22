import { OverlayManager } from '@components/organisms/OverlayManager';
import { Alert } from '@temp/@next/components/atoms/Alert';
import { ItemsNotification } from '@temp/@next/components/atoms/ItemsNotification';
import { MetaConsumer } from '@temp/@next/components/atoms/Meta';
import { AddressGeoModal } from '@temp/@next/components/molecules/AddressGeoModal/AddressGeoModal';
import { Footer } from '@temp/@next/components/organisms/Footer';
import { SearchNetworkResult } from '@temp/@next/components/organisms/OverlayManager/Search';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';
import { useUpdateCartLines } from '@temp/@next/hooks/useUpdateCartLines';
import { useUserDetails } from '@temp/@sdk/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { Header } from './Header';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@temp/pages'), {
  ssr: false,
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { update: updateCartLines } = useUpdateCartLines();
  const [district, setDistrict] = useDistrictSelected();
  const { data: user } = useUserDetails();
  const router = useRouter();
  React.useEffect(() => {
    (window as any).updateCartLines = () => {
      updateCartLines();
    };
    (window as any).updateDistrict = (district) => {
      setDistrict(district);
    };
  });

  React.useEffect(() => {
    if (district && !router.pathname.includes('checkout')) {
      updateCartLines();
    }
  }, [district]);

  const renderPage = (props) => {
    if (pageProps.protected && !user) {
      return <HomePage />;
    }
    return <Component {...props} />;
  };

  return (
    <>
      <ItemsNotification />
      <Alert />
      <AddressGeoModal />
      <SearchNetworkResult />
      <MetaConsumer />
      <Header />
      {renderPage(pageProps)}
      <Footer />
      <OverlayManager />
    </>
  );
};

export default App;
