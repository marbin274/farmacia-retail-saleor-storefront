import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CheckIcon } from "@farmacia-retail/farmauna-components";
import { PopAlert } from "./PopAlert";
import { IPopAlertProps } from "./types";

const DEFAULT_PROPS: IPopAlertProps = {
  title: "My Title",
  message: "My Message",
  icon: <CheckIcon data-testid="icon" />,
};

describe("<PopAlert />", () => {
  it("exists", () => {
    render(<PopAlert {...DEFAULT_PROPS} />);
  });

  it("renders correct values", () => {
    render(<PopAlert {...DEFAULT_PROPS} />);

    expect(screen.getByText(DEFAULT_PROPS.title)).toBeDefined();
    expect(screen.getByText(DEFAULT_PROPS.message)).toBeDefined();
    expect(screen.findByTestId("icon")).toBeDefined();
  });

  it("calls close event", () => {
    render(<PopAlert {...DEFAULT_PROPS} />);

    const closeIcon = screen.getByTestId("close-icon");
    fireEvent.click(closeIcon);

    expect(screen.queryByText(DEFAULT_PROPS.title)).toBeNull();
    expect(screen.queryByText(DEFAULT_PROPS.message)).toBeNull();
    expect(screen.queryByTestId("icon")).toBeNull();
  });
});
