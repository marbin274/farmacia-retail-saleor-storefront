import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { CreditCardIcon } from '.';

describe('<CreditCardIcon />', () => {
  it('contains credit card visa', () => {
    render(<CreditCardIcon creditCardProvider="visa" />);
    const creditCard = screen.getByRole('payment-visa');
    expect(creditCard).toBeInTheDocument();
  });

  it('contains credit card maestro', () => {
    render(<CreditCardIcon creditCardProvider="maestro" />);
    const creditCard = screen.getByRole('payment-maestro');
    expect(creditCard).toBeInTheDocument();
  });

  it('contains credit card mastercard', () => {
    render(<CreditCardIcon creditCardProvider="mastercard" />);
    const creditCard = screen.getByRole('payment-mastercard');
    expect(creditCard).toBeInTheDocument();
  });

  it('contains credit card american-express', () => {
    render(<CreditCardIcon creditCardProvider="amex" />);
    const creditCard = screen.getByRole('payment-amex');
    expect(creditCard).toBeInTheDocument();
  });
  it('contains credit card discover', () => {
    render(<CreditCardIcon creditCardProvider="discover" />);
    const creditCard = screen.getByRole('payment-discover');
    expect(creditCard).toBeInTheDocument();
  });
});
