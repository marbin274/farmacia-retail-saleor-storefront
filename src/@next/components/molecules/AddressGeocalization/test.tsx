import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { AddressGeocalization } from '.';
import { useLocation } from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual<{ pathname: string }>('react-router'),
  useLocation: jest.fn(),
}));

describe('<AddressGeocalizationInfo />', () => {
  it('show correct text', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({
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
    (useLocation as jest.Mock).mockReturnValueOnce({
      pathname: '/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).toBeInTheDocument();
  });

  it('exists in category', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({
      pathname: '/category',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).toBeInTheDocument();
  });

  it('is not showed in account', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({
      pathname: '/account/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).not.toBeInTheDocument();
  });

  it('is not showed in checkout', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({
      pathname: '/checkout/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).not.toBeInTheDocument();
  });

  it('is not showed in order-finalized', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({
      pathname: '/order-finalized/',
    });
    render(<AddressGeocalization mode="ligth" />);
    const addressGeolocalization = screen.queryByTestId(
      'address-geolocalization'
    );
    expect(addressGeolocalization).not.toBeInTheDocument();
  });
});
