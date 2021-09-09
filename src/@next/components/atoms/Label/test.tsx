import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';

import { Label } from '.';

describe('<Label />', () => {
  it('exists', () => {
    render(<Label>test</Label>);
    const label = screen.getByTestId('label');
    expect(label.textContent).toBe('test');
  });
});
