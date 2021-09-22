import { useAuth } from '@temp/@sdk/react';
import { useAlert } from 'react-alert';

export const AlertNotification = () => {
  const alert = useAlert();

  useAuth((authenticated: boolean) => {
    if (authenticated) {
      alert.show(
        {
          title: '¡Hola de nuevo!',
        },
        { type: 'success' }
      );
    } else {
      alert.show(
        {
          title: 'Cerraste sesión',
        },
        { type: 'success' }
      );
    }
  });
  return null;
};
