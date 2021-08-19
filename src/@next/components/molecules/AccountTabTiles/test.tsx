import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { AccountTile } from './AccountTile';
import { PasswordTile } from './PasswordTile';

jest.mock('@sdk/react', () => ({
  useAccountUpdate: () => [jest.fn(), { data: null, error: null }],
  usePasswordChange: () => [jest.fn(), { data: null, error: null }],
  useUserDetails: () => ({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon@email.com',
      documentNumber: '99887766',
    },
  }),
}));

const DEFAULT_PROPS = {
  account: {
    startFocusAccount: jest.fn(),
    stopFocusAccount: jest.fn(),
  },
  password: {
    startFocusPassword: jest.fn(),
    stopFocusPassword: jest.fn(),
  },
};

describe('<AccountTile />', () => {
  it('Render', () => {
    render(<AccountTile {...DEFAULT_PROPS.account} />);
    expect(screen.queryByRole('fullname').textContent).toBe('John Doe');
    expect(screen.queryByRole('email').textContent).toBe('jhon@email.com');
    expect(screen.queryByRole('document').textContent).toBe('99887766');
  });

  it('Edit Account', () => {
    render(<AccountTile {...DEFAULT_PROPS.account} />);
    expect(screen.queryByRole('account-form')).not.toBeInTheDocument();
    const editOption = screen.getByRole('edit-account-option');
    fireEvent.click(editOption);
    expect(DEFAULT_PROPS.account.startFocusAccount).toBeCalledTimes(1);
    expect(screen.queryByRole('account-form')).toBeInTheDocument();
  });

  it('Edit Password', () => {
    render(<PasswordTile {...DEFAULT_PROPS.password} />);
    expect(screen.queryByRole('password-form')).not.toBeInTheDocument();
    const editOption = screen.getByRole('edit-password-option');
    fireEvent.click(editOption);
    expect(DEFAULT_PROPS.password.startFocusPassword).toBeCalledTimes(1);
    expect(screen.queryByRole('password-form')).toBeInTheDocument();
  });
});
