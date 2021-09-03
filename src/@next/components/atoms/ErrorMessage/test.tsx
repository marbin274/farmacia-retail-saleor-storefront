import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ErrorMessage } from '.';

describe('<ErrorMessage />', () => {
  const ERRORS = [{ field: 'Field', message: 'Message' }];
  const DEFAULT_PROPS = {
    errors: ERRORS,
  };

  it('exists', () => {
    render(<ErrorMessage {...DEFAULT_PROPS} />);
    const error = screen.getByRole('error');
    const paragraphs = screen.getAllByRole('error-paragraph');
    expect(error).toBeInTheDocument();
    expect(paragraphs).toHaveLength(1);
  });

  it("shouldn't render if `errors` array is empty", () => {
    render(<ErrorMessage errors={[]} />);
    const error = screen.queryByRole('error');
    expect(error).toBeNull();
  });

  it('should render each message from `errors`', () => {
    const customError = [{ field: 'Field', message: 'Required' }];
    render(<ErrorMessage errors={[...ERRORS, ...customError]} />);
    const paragraphs = screen.getAllByRole('error-paragraph');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].textContent).toEqual('Message');
    expect(paragraphs[1].textContent).toEqual('Required');
  });
});
