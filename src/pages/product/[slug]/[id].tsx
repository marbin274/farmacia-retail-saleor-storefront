import { ProductPage } from '@temp/@next/pages';
import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();

  return <ProductPage id={query.id as string} />;
};

export default Page;
