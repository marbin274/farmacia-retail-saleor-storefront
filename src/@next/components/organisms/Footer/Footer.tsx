import { useFooterSecondayMenu } from '@sdk/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';
const Nav = dynamic(() => import('./Nav'), { ssr: false });

const Footer: React.FC = () => {
  const { pathname } = useRouter();
  const showFooter = !(
    pathname.includes('checkout') || pathname.includes('order-finalized')
  );
  const { data, loading } = useFooterSecondayMenu();

  if (!showFooter) return <></>;

  return (
    <div id="footer">
      <Nav secondaryMenu={data} loading={loading} />
    </div>
  );
};

export default Footer;
