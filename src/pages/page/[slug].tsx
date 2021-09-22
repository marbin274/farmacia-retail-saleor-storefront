import { ArticlePage } from '@temp/@next/pages';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Page: FC = () => {
  const { query } = useRouter();
  return <ArticlePage slug={query.slug as string} />;
};

export default Page;
