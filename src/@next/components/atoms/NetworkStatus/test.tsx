import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import NetworkStatus from '.';

describe('<NetworkStatus />', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    Object.defineProperty(window.navigator, 'onLine', {
      value: true,
      configurable: true,
    });
  });

  it('show online when network status is online', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      value: true,
      configurable: true,
    });
    render(
      <NetworkStatus>
        {(isOnline) => {
          if (!isOnline) {
            return <div data-testid="offline">Offline</div>;
          }
          return <div data-testid="online">Online</div>;
        }}
      </NetworkStatus>
    );
    expect(screen.getByTestId('online')).toBeInTheDocument();
  });

  it('show offline when network status is offline', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    });
    render(
      <NetworkStatus>
        {(isOnline) => {
          if (!isOnline) {
            return <div data-testid="offline">Offline</div>;
          }
          return <div data-testid="online">Online</div>;
        }}
      </NetworkStatus>
    );
    expect(screen.getByTestId('offline')).toBeInTheDocument();
  });
});
