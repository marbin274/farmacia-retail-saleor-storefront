import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { AddressGeocalization } from '.';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  ...jest.requireActual<{ pathname: string }>('next/router'),
  useRouter: jest.fn(),
}));

describe('<AddressGeocalizationInfo />', () => {
  it('show correct text', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      pathname: '/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization.textContent).toBe(
      '¡Hola! aquí puedes cambiar el distrito donde enviaremos tus productos.'
    );
  });
  it('exists in home', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      pathname: '/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).toBeInTheDocument();
  });

  it('exists in category', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      pathname: '/category',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).toBeInTheDocument();
  });

  it('is not showed in account', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      pathname: '/account/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).not.toBeInTheDocument();
  });

  it('is not showed in checkout', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      pathname: '/checkout/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).not.toBeInTheDocument();
  });

  it('is not showed in order-finalized', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      pathname: '/order-finalized/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).not.toBeInTheDocument();
  });
});
