import { render, screen } from '@testing-library/react';
import React from 'react';
import { PaymentPOS } from '.';

describe('<PaymentPOS />', () => {
  it('exists', () => {
    render(<PaymentPOS />);
  });

  it('Text match', () => {
    render(<PaymentPOS />);
    expect(
      screen.getByText(
        'El motorizado llevará el POS de Niubiz para que pagues como prefieras:'
      )
    ).toBeDefined();
  });
});
