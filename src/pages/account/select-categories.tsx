import { CategoriesTab } from '@temp/@next/pages/AccountPage/subpages';

const Page = () => {
  return <CategoriesTab />;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Page;
