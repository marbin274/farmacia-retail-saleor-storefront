import { MessageNotification } from '@components/atoms';
import { OverlayContextInterface } from '@components/organisms/OverlayComponent';
import * as React from 'react';

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
