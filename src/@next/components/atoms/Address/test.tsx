import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Address } from ".";

describe("<Address />", () => {
  let props: any;

  beforeEach(() => {
    props = {
      city: "Wroclaw",
      companyName: "Mirumee",
      country: {
        code: "PL",
        country: "Poland",
      },
      countryArea: "dolnyslask",
      firstName: "John",
      lastName: "Doe",
      phone: "555-5555",
      postalCode: "55-555",
      streetAddress1: "St Street",
      streetAddress2: "Second",
    };
  });

  it("render with basic information", () => {
    render(<Address {...props} />);
    expect(screen.queryByRole('fullname').textContent).toBe(`${props.firstName} ${props.lastName}`);
    expect(screen.queryByRole('companyName').textContent).toBe(props.companyName);
    expect(screen.queryByRole('streetAddress1').textContent).toBe(props.streetAddress1);
    expect(screen.queryByRole('streetAddress2').textContent).toBe(props.streetAddress2);
    expect(screen.queryByRole('location').textContent).toBe(`Distrito: ${props.postalCode}, ${props.city}`);
    expect(screen.queryByRole('country').textContent).toBe(`Pais: ${props.countryArea}, ${props.country.country}`);
    expect(screen.queryByRole('phone').textContent).toBe(`Celular: ${props.phone}`);
  });

  it("render without companyName", () => {
    props = {...props, companyName: null};
    render(<Address {...props} />);
    expect(screen.queryByRole('fullname').textContent).toBe(`${props.firstName} ${props.lastName}`);
    expect(screen.queryByRole('companyName')).not.toBeInTheDocument();
    expect(screen.queryByRole('streetAddress1').textContent).toBe(props.streetAddress1);
    expect(screen.queryByRole('streetAddress2').textContent).toBe(props.streetAddress2);
    expect(screen.queryByRole('location').textContent).toBe(`Distrito: ${props.postalCode}, ${props.city}`);
    expect(screen.queryByRole('country').textContent).toBe(`Pais: ${props.countryArea}, ${props.country.country}`);
    expect(screen.queryByRole('phone').textContent).toBe(`Celular: ${props.phone}`);
  });

  it("render without streetAddress2", () => {
    props = {...props, streetAddress2: null};
    render(<Address {...props} />);
    expect(screen.queryByRole('fullname').textContent).toBe(`${props.firstName} ${props.lastName}`);
    expect(screen.queryByRole('companyName').textContent).toBe(props.companyName);
    expect(screen.queryByRole('streetAddress1').textContent).toBe(props.streetAddress1);
    expect(screen.queryByRole('streetAddress2')).not.toBeInTheDocument();
    expect(screen.queryByRole('location').textContent).toBe(`Distrito: ${props.postalCode}, ${props.city}`);
    expect(screen.queryByRole('country').textContent).toBe(`Pais: ${props.countryArea}, ${props.country.country}`);
    expect(screen.queryByRole('phone').textContent).toBe(`Celular: ${props.phone}`);
  });

  it("render without postalCode", () => {
    props = {...props, postalCode: null};
    render(<Address {...props} />);
    expect(screen.queryByRole('fullname').textContent).toBe(`${props.firstName} ${props.lastName}`);
    expect(screen.queryByRole('companyName').textContent).toBe(props.companyName);
    expect(screen.queryByRole('streetAddress1').textContent).toBe(props.streetAddress1);
    expect(screen.queryByRole('streetAddress2').textContent).toBe(props.streetAddress2);
    expect(screen.queryByRole('location').textContent).toBe(`Distrito:  ${props.city}`);
    expect(screen.queryByRole('country').textContent).toBe(`Pais: ${props.countryArea}, ${props.country.country}`);
    expect(screen.queryByRole('phone').textContent).toBe(`Celular: ${props.phone}`);
  });

  it("render without countryArea", () => {
    props = {...props, countryArea: null};
    render(<Address {...props} />);
    expect(screen.queryByRole('fullname').textContent).toBe(`${props.firstName} ${props.lastName}`);
    expect(screen.queryByRole('companyName').textContent).toBe(props.companyName);
    expect(screen.queryByRole('streetAddress1').textContent).toBe(props.streetAddress1);
    expect(screen.queryByRole('streetAddress2').textContent).toBe(props.streetAddress2);
    expect(screen.queryByRole('location').textContent).toBe(`Distrito: ${props.postalCode}, ${props.city}`);
    expect(screen.queryByRole('country').textContent).toBe(`Pais: ${props.country.country}`);
    expect(screen.queryByRole('phone').textContent).toBe(`Celular: ${props.phone}`);
  });

  it("render without phone", () => {
    props = {...props, phone: null};
    render(<Address {...props} />);
    expect(screen.queryByRole('fullname').textContent).toBe(`${props.firstName} ${props.lastName}`);
    expect(screen.queryByRole('companyName').textContent).toBe(props.companyName);
    expect(screen.queryByRole('streetAddress1').textContent).toBe(props.streetAddress1);
    expect(screen.queryByRole('streetAddress2').textContent).toBe(props.streetAddress2);
    expect(screen.queryByRole('location').textContent).toBe(`Distrito: ${props.postalCode}, ${props.city}`);
    expect(screen.queryByRole('country').textContent).toBe(`Pais: ${props.countryArea}, ${props.country.country}`);
    expect(screen.queryByRole('phone')).not.toBeInTheDocument();
  });
});
