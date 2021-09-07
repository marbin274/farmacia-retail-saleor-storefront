import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Message } from '.';

describe('<Message />', () => {
  it('renders passed title', () => {
    const text = 'test';
    render(<Message title={text} onClick={jest.fn()} />);
    const title = screen.getByTestId('message-title');
    expect(title.textContent).toEqual(text);
  });

  it('renders children when passed in', () => {
    render(
      <Message title="" onClick={jest.fn()}>
        <div className="unique" data-testid="message-children" />
      </Message>
    );
    const children = screen.getByTestId('message-children');
    expect(children).toBeInTheDocument();
  });

  it('click on action text', () => {
    const onClick = jest.fn();
    render(<Message title="Alerta" onClick={onClick} actionText="test" />);
    const actionButton = screen.getByRole('action-button');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton.textContent).toEqual('test');
    fireEvent.click(actionButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('click on action text', () => {
    const onClick = jest.fn();
    render(<Message title="Alerta" onClick={onClick} />);
    const closeButton = screen.getByRole('close-button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('click on action text without title', () => {
    const onClick = jest.fn();
    render(
      <Message title="" onClick={onClick} actionText="test">
        Contenido
      </Message>
    );
    const closeButton = screen.getByRole('action-button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('click on close button without title', () => {
    const onClick = jest.fn();
    render(
      <Message title="" onClick={onClick}>
        Contenido
      </Message>
    );
    const closeButton = screen.getByRole('close-button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
