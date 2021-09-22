import { PaymentMethodList } from '@temp/@next/pages/AccountPage/subpages';

const Page = () => {
  return <PaymentMethodList />;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Page;
