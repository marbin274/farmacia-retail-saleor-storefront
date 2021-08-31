import * as React from 'react';
import {
  Overlay,
  OverlayContextInterface,
} from '@components/organisms/OverlayComponent';

const Modal: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => (
  <Overlay context={overlay}>{overlay.context.content}</Overlay>
);

export default Modal;
