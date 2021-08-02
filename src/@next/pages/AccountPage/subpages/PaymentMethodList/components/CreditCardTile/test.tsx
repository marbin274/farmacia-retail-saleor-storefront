import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreditCardTile } from "./CreditCardTile";
import { ICreditCardTileProps } from "./types";

const DEFAULT_PROPS: ICreditCardTileProps = {
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
  onClickDelete: undefined,
  onClickSetDefault: undefined,
};

describe("<CreditCardTile />", () => {
  it("exists", () => {
    render(<CreditCardTile {...DEFAULT_PROPS} />);
  });

  it("shows correct values", () => {
    render(<CreditCardTile {...DEFAULT_PROPS} />);

    const cardNumber = screen.getByTestId("card-number");
    expect(cardNumber.textContent).toBe("1234••••••••9876");

    const fullname = screen.getByTestId("fullname");
    expect(fullname.textContent).toBe("User Pluser");
  });

  it("calls correct event props", () => {
    const onClickSetDefault = jest.fn();
    const onClickDelete = jest.fn();
    render(
      <CreditCardTile
        {...DEFAULT_PROPS}
        onClickSetDefault={onClickSetDefault}
        onClickDelete={onClickDelete}
      />
    );

    const mainCardOption = screen.getByTestId("main-card-option");
    fireEvent.click(mainCardOption);
    expect(onClickSetDefault).toBeCalledTimes(1);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(onClickDelete).toBeCalledTimes(1);
  });
});
