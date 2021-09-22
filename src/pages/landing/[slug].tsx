import { LandingPage } from '@temp/@next/pages';
import { useRouter } from 'next/router';
import React from 'react';

const Page: React.FC = () => {
  const { query } = useRouter();

  return <LandingPage slug={query.slug as string} />;
};

export default Page;
