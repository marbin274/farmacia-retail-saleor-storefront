import './scss/index.scss';
import * as React from 'react';
import Nav from './Nav';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const showFooter = !(
    location.pathname.includes('checkout') ||
    location.pathname.includes('order-finalized')
  );

  if (!showFooter) return <></>;

  return (
    <div className="footer" id="footer">
      <Nav />
    </div>
  );
};

export default Footer;
