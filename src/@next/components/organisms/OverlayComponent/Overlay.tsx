import classNames from 'classnames';
import * as React from 'react';
import { OverlayWrapper } from './styles';
import { OverlayContextInterface } from './context';

interface OverlayProps {
  context: OverlayContextInterface;
  className?: string;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  className,
  context: { type, theme, hide },
}) => (
  <OverlayWrapper
    className={classNames('overlay', {
      [`overlay--${type}`]: !!type,
      [`${className}`]: !!className,
    })}
    onClick={hide}
  >
    <div className={`overlay__${theme}`} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </OverlayWrapper>
);

export default Overlay;
