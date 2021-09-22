import { AccountTab } from '@temp/@next/pages/AccountPage/subpages';

const Page = () => {
  return <AccountTab />;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Page;
