import { MessageNotification } from '@components/atoms';
import * as React from 'react';

import { OverlayContextInterface } from '..';

export const NotificationOverlay: React.FC<{
  overlay: OverlayContextInterface;
}> = ({ overlay: { hide, context } }) => {
  return (
    <MessageNotification
      title={context.title}
      status={context.status}
      onClose={hide}
    >
      {context.content}
    </MessageNotification>
  );
};

export default NotificationOverlay;
