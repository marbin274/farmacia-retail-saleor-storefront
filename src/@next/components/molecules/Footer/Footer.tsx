import * as React from 'react';
import Nav from './Nav';
import { useLocation } from 'react-router-dom';
import { useFooterSecondayMenu } from '@sdk/react';

const Footer: React.FC = () => {
  const location = useLocation();
  const showFooter = !(
    location.pathname.includes('checkout') ||
    location.pathname.includes('order-finalized')
  );

  if (!showFooter) return <></>;

  const { data, loading } = useFooterSecondayMenu();

  return (
    <div id="footer">
      <Nav secondaryMenu={data} loading={loading} />
    </div>
  );
};

export default Footer;
