import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import "jest-styled-components";
import React from "react";

import { CartFooter } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CartFooter />", () => {
  let props: any;

  beforeEach(() => {
    props = { ...DEFAULT_PROPS };
  });

  it("render with basic information", () => {
    render(<CartFooter {...props} />);
    expect(screen.queryByRole('totalPrice').textContent).toBe(props.totalPrice);
    expect(screen.queryByRole('subtotalPrice').textContent).toBe(props.subtotalPrice);
    expect(screen.queryByRole('shippingPrice')).not.toBeInTheDocument();
    expect(screen.queryByRole('discountPrice')).not.toBeInTheDocument();
  });

  it("render with shippingPrice", () => {
    props.shippingPrice = 'S/ 10.00';
    render(<CartFooter {...props} />);
    expect(screen.queryByRole('totalPrice').textContent).toBe(props.totalPrice);
    expect(screen.queryByRole('subtotalPrice').textContent).toBe(props.subtotalPrice);
    expect(screen.queryByRole('shippingPrice').textContent).toBe('S/ 10.00');
    expect(screen.queryByRole('discountPrice')).not.toBeInTheDocument();
  });

  it("render with discountPrice", () => {
    props.discountPrice = 'S/ 18.60';
    render(<CartFooter {...props} />);
    expect(screen.queryByRole('totalPrice').textContent).toBe(props.totalPrice);
    expect(screen.queryByRole('subtotalPrice').textContent).toBe(props.subtotalPrice);
    expect(screen.queryByRole('shippingPrice')).not.toBeInTheDocument();
    expect(screen.queryByRole('discountPrice').textContent).toBe('S/ 18.60');
  });

});
