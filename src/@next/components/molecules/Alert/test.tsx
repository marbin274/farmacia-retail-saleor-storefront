import React from "react";
import { render, screen } from "@testing-library/react";
import { CheckIcon } from "@farmacia-retail/farmauna-components";
import { Alert } from "./Alert";
import { IAlertProps } from "./types";

const DEFAULT_PROPS: IAlertProps = {
  message: "This is a message",
};

describe("<Alert />", () => {
  it("exists", () => {
    render(<Alert {...DEFAULT_PROPS} />);
  });

  it("renders correct values", () => {
    render(
      <Alert {...DEFAULT_PROPS} icon={<CheckIcon data-testid="icon" />} />
    );

    const messageSpan = screen.findByText(DEFAULT_PROPS.message);
    expect(messageSpan).toBeDefined();
    expect(screen.queryByTestId("icon")).toBeDefined();
  });
});
