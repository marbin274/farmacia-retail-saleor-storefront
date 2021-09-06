import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { CartHeader } from '.';

describe('<CartHeader />', () => {
  it('exists', () => {
    render(<CartHeader />);
    const cartHeader = screen.getByTestId('cart-header');
    expect(cartHeader).toBeInTheDocument();
  });
});
