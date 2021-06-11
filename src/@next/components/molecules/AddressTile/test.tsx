import { render, screen, fireEvent } from '@testing-library/react';
import "jest-styled-components";
import React from "react";
import { AddressTile } from ".";

const onEdit = jest.fn();
const onRemove = jest.fn();
const removeDefault = jest.fn();
const setDefault = jest.fn();

const DEFAULT_PROPS = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: {
      code: "PL",
      country: "Poland",
    },
    countryArea: "dolnyslask",
    firstName: "John",
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  onEdit,
  onRemove,
  removeDefault,
  setDefault,
};

describe("<AddressTile />", () => {
  it("exists", () => {
    render(<AddressTile {...DEFAULT_PROPS} />);
    const addressTile = screen.getByRole("address-tile");
    expect(addressTile).toBeTruthy();
  });

  it("should run onRemove function for clicking on trash button", () => {
    render(<AddressTile {...DEFAULT_PROPS} />);
    const deleteOption = screen.getByRole("delete-option");
    fireEvent.click(deleteOption);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });


  it("should run onEdit function for clicking on edit button", () => {
    render(<AddressTile {...DEFAULT_PROPS} />);
    const editOption = screen.getByRole("edit-option");
    fireEvent.click(editOption);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("should run remove setDefault method for clicking on Set default when address is default already", () => {
    render(<AddressTile {...DEFAULT_PROPS} />);
    const defaultAddress = screen.getByRole("default-address");
    fireEvent.click(defaultAddress);
    expect(removeDefault).toBeCalled();
  });

  it("should run setDefault method for clicking on Set default", () => {
    const DEFAULT_PROPS_NOT_DEFAULT = {
      ...DEFAULT_PROPS,
      address: {
        ...DEFAULT_PROPS.address,
        isDefaultBillingAddress: false,
        isDefaultShippingAddress: false,
      },
    };

    render(<AddressTile {...DEFAULT_PROPS_NOT_DEFAULT} />);
    const defaultAddress = screen.getByRole("default-address");
    fireEvent.click(defaultAddress);

    expect(setDefault).toHaveBeenCalledWith("BILLING");
    expect(setDefault).toHaveBeenCalledWith("SHIPPING");
  });

  it("should present Default address if address is default shipping", () => {
    render(<AddressTile {...DEFAULT_PROPS} />);
    const addressStatusFlag = screen.getByRole("address-status-flag");
    expect(addressStatusFlag.classList.contains('fa-bg-brand-01')).toBe(true)
  });

});
