import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';

import { AddNewTile } from '.';

describe('<AddNewTile />', () => {
  it('should display child component with card type passed as prop and rendered inside it as a text', () => {
    render(<AddNewTile type="card" />);
    const text = screen.getByText('Agregar nueva card');
    expect(text).toBeDefined();
  });
});
