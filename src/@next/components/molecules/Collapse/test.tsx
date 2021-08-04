import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Collapse } from "./Collapse";
import { ICollapseProps } from "./types";

const DEFAULT_PROPS: ICollapseProps = {
  active: false,
  header: "My header",
};

describe("<Collapse />", () => {
  it("exists", () => {
    render(<Collapse {...DEFAULT_PROPS} />);
  });

  it("hiddes children when not active", () => {
    const { rerender } = render(
      <Collapse {...DEFAULT_PROPS}>
        <div data-testid="child"></div>
      </Collapse>
    );
    expect(screen.queryByTestId("child")).toBeNull();

    rerender(
      <Collapse {...DEFAULT_PROPS} active={true}>
        <div data-testid="child"></div>
      </Collapse>
    );
    expect(screen.queryByTestId("child")).toBeDefined();
  });

  it("fires on click when header is clicked", () => {
    const onClick = jest.fn();
    render(<Collapse {...DEFAULT_PROPS} onClick={onClick} />);
    
    const header = screen.getByTestId("header");
    fireEvent.click(header);
    expect(onClick).toBeCalledTimes(1);
  });
});
