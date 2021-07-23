import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreditCardItem } from "./CreditCardItem";
import { ICreditCardItemProps } from "./types";

const DEFAULT_PROPS: ICreditCardItemProps = {
  creditCard: {
    __typename: "CardToken",
    binNumber: "1234",
    brand: "visa",
    cardNumber: "1234********9876",
    default: false,
    email: "dsadsad",
    firstName: "User",
    id: "1d",
    lastName: "Pluser",
  },
  onClickSelect: undefined,
  selected: false,
};

describe("<CreditCardItem />", () => {
  it("exists", () => {
    render(<CreditCardItem {...DEFAULT_PROPS} />);
  });

  it("shows correct values", () => {
    render(<CreditCardItem {...DEFAULT_PROPS} />);

    const cardNumber = screen.getByTestId("card-number");
    expect(cardNumber.textContent).toBe("1234••••••••9876");

    const fullname = screen.getByTestId("fullname");
    expect(fullname.textContent).toBe("User Pluser");
  });

  it("changes style when selected", () => {
    const { rerender } = render(<CreditCardItem {...DEFAULT_PROPS} />);

    expect(screen.queryByTestId("selected-icon")).toBeNull();

    rerender(<CreditCardItem {...DEFAULT_PROPS} selected={true} />);
    expect(screen.queryByTestId("selected-icon")).toBeDefined();
  });

  it("calls correct event props", () => {
    const onClickSelect = jest.fn();

    render(<CreditCardItem {...DEFAULT_PROPS} onClickSelect={onClickSelect} />);

    const selectOption = screen.getByTestId("select-option");
    fireEvent.click(selectOption);
    expect(onClickSelect).toBeCalledTimes(1);
  });
});
