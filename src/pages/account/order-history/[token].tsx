import { OrderDetails } from '@temp/@next/pages/AccountPage/subpages';
import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();
  return <OrderDetails token={query?.token as string} />;
};

Page.getInitialProps = async () => {
  return { protected: true };
};

export default Page;
