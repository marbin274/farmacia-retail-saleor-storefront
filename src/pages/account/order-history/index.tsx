import { OrdersHistory } from '@temp/@next/pages/AccountPage/subpages';

const Page = () => {
  return <OrdersHistory />;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Page;
