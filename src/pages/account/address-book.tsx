import { AddressBook } from '@temp/@next/pages/AccountPage/subpages';

const Page = () => {
  return <AddressBook />;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Page;
