import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Helmet } from 'react-helmet';
import React from 'react';
import { MetaWrapper } from '.';

describe('<MetaWrapper />', () => {
  it('should render', () => {
    render(
      <MetaWrapper
        meta={{
          description: 'SEO descripcion',
          title: 'SEO titulo',
          type: 'product.collection',
        }}
      >
        Page
      </MetaWrapper>
    );
    const helmet = Helmet.peek();
    expect(helmet.title).toBe('SEO titulo');
  });
});
