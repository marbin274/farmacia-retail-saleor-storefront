import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { itemNotificationsService } from './ItemsNotificationService';
import { ItemsNotification } from './ItemsNotification';

const PRODUCT = {
  id: '1',
  name: 'Paracetamol',
};

describe('<ItemsNotification />', () => {
  afterEach(() => {
    itemNotificationsService.clearNotifications();
  });

  it('exists', () => {
    render(<ItemsNotification />);
    itemNotificationsService.sendNotifications(PRODUCT, 1);
    const notificationContainer = screen.queryByTestId(
      'notification-container'
    );
    expect(notificationContainer).toBeInTheDocument();
  });

  it("show the name's product as the message ", () => {
    render(<ItemsNotification />);
    itemNotificationsService.sendNotifications(PRODUCT, 1);
    const notificationMessage = screen.queryByRole('notification-message');
    expect(notificationMessage.textContent).toBe(PRODUCT.name);
  });

  it('show title accordint to the number of notifications', () => {
    render(<ItemsNotification />);
    itemNotificationsService.sendNotifications(PRODUCT, 1);
    let notificationTitle = screen.queryByTestId('notification-title');
    expect(notificationTitle.textContent).toBe('Producto Agregado');
    itemNotificationsService.sendNotifications(
      {
        id: '2',
        name: 'Cetirizina',
      },
      1
    );
    notificationTitle = screen.queryByTestId('notification-title');
    expect(notificationTitle.textContent).toBe('Productos Agregados');
  });

  it('there is notifications', () => {
    render(<ItemsNotification />);
    itemNotificationsService.sendNotifications(PRODUCT, 1);
    itemNotificationsService.sendNotifications(
      {
        id: '2',
        name: 'Cetirizina',
      },
      1
    );
    const notificationItems = screen.queryAllByRole('notification-items');
    expect(notificationItems).toHaveLength(2);
  });

  it('there is not notification', () => {
    render(<ItemsNotification />);
    const notificationContainer = screen.queryByTestId(
      'notification-container'
    );
    expect(notificationContainer).toBeNull();
  });

  it('hide notifitcation on three seconds', async () => {
    render(<ItemsNotification />);
    itemNotificationsService.sendNotifications(PRODUCT, 1);
    const notificationItems = screen.queryAllByRole('notification-items');
    expect(notificationItems).toHaveLength(1);
    await new Promise((r) => setTimeout(r, 4000));
    const notificationContainer = screen.queryByTestId(
      'notification-container'
    );
    expect(notificationContainer).toBeNull();
  });
});
