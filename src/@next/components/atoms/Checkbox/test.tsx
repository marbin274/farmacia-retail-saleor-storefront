import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { Checkbox } from '.';

describe('<Checkbox />', () => {
  it('exists', () => {
    render(<Checkbox name="default-checkbox">Checkbox with label</Checkbox>);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByTestId('checkbox-label');
    expect(label.textContent).toBe('Checkbox with label');
  });

  it('Call onChange on click input', () => {
    const onChange = jest.fn();
    render(
      <Checkbox name="default-checkbox" onChange={onChange}>
        Checkbox with label
      </Checkbox>
    );
    const checkboxInput = screen.getByTestId('checkbox-input');
    fireEvent.click(checkboxInput);
    expect(onChange).toBeCalledTimes(1);
  });

  it("Don't call onChange on click input when it has readonly", () => {
    const onChange = jest.fn();
    render(
      <Checkbox name="default-checkbox" onChange={onChange} readOnly>
        Checkbox with label
      </Checkbox>
    );
    const checkboxInput = screen.getByTestId('checkbox-input');
    fireEvent.click(checkboxInput);
    expect(onChange).not.toBeCalled();
  });

  it("Don't call onChange on click input when it has disabled", () => {
    const onChange = jest.fn();
    render(
      <Checkbox name="default-checkbox" onChange={onChange} disabled>
        Checkbox with label
      </Checkbox>
    );
    const checkboxInput = screen.getByTestId('checkbox-input');
    fireEvent.click(checkboxInput);
    expect(onChange).not.toBeCalled();
  });
});
