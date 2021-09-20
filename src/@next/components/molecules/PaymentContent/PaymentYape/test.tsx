import { render, screen } from '@testing-library/react';
import React from 'react';
import { PaymentYape } from '.';

describe('<PaymentYape />', () => {
  it('exists', () => {
    render(<PaymentYape />);
  });

  it('Text match', () => {
    render(<PaymentYape />);
    expect(
      screen.getByText(
        'El motorizado llevará el POS para que puedas realizar el pago con código QR una vez te hayan entregado tu pedido.'
      )
    ).toBeDefined();
  });
});
