import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MetaWrapper } from '.';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  pathname: '/',
}));
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe('<MetaWrapper />', () => {
  it('should render', async () => {
    const { debug } = render(
      <MetaWrapper
        meta={{
          description: 'SEO descripcion',
          title: 'SEO titulo',
          type: 'product.collection',
        }}
      >
        Page
      </MetaWrapper>,
      {
        container: document.head,
      }
    );
    debug();
    await waitFor(() => {
      expect(document.title).toEqual('SEO titulo');
    });
  });
});
