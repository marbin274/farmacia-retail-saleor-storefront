import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { alertService } from './AlertService';
import { Alert } from '.';
import ErrorFormPopulateIcon from 'images/auna/form-populate-error.svg';
import { IAlertServiceProps } from './types';

let ALERT: IAlertServiceProps = {
  buttonText: 'Entendido',
  icon: ErrorFormPopulateIcon,
  title: 'Título',
  message: 'Esto es una demo',
  type: 'Info',
};

describe('<Alert />', () => {
  beforeAll(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  beforeEach(() => {
    ALERT = {
      buttonText: 'Entendido',
      title: 'Título',
      message: 'Esto es una demo',
      type: 'Info',
    };
  });

  afterEach(() => {
    alertService.clearAlert();
  });

  it('should render', async () => {
    render(<Alert />);
    alertService.sendAlert(ALERT);
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    expect(screen.getByTestId('alert-title').textContent).toBe(ALERT.title);
    expect(screen.getByTestId('alert-message').textContent).toBe(ALERT.message);
    expect(screen.getByTestId('alert-button').textContent).toBe(
      ALERT.buttonText
    );
  });

  it('should render without icon when is type Text', async () => {
    render(<Alert />);
    alertService.sendAlert({
      ...ALERT,
      type: 'Text',
    });
    expect(screen.queryByTestId('alert-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('alert-title').textContent).toBe(ALERT.title);
    expect(screen.getByTestId('alert-message').textContent).toBe(ALERT.message);
    expect(screen.getByTestId('alert-button').textContent).toBe(
      ALERT.buttonText
    );
  });

  it('should hide when it not has redirect option', () => {
    render(<Alert />);
    alertService.sendAlert(ALERT);
    fireEvent.click(screen.getByTestId('alert-button'));
    expect(screen.queryByTestId('alert-message')).not.toBeInTheDocument();
  });
});
