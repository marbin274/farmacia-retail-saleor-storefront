import { WINDOW_EXISTS } from '@temp/@sdk/consts';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import * as S from './styles';
import { IProps } from './types';

export const Overlay: React.FC<IProps> = ({
  children,
  className,
  duration = 600,
  hide,
  position = 'center',
  show,
  transparent = false,
  target,
}: IProps) => {
  const animationProps = {
    open: show,
    position,
  };

  const getTargetDOM = () => {
    if (!target) {
      return WINDOW_EXISTS ? document.getElementById('modal-root') : null;
    }

    return target;
  };
  const targetDOM = getTargetDOM();

  return (
    targetDOM &&
    ReactDOM.createPortal(
      <Transition in={show} timeout={duration} unmountOnExit>
        {(state) => (
          <S.Overlay
            className={className}
            {...animationProps}
            state={state}
            onClick={hide}
            transparent={transparent}
          >
            <S.Lightbox
              id="lightbox-modal"
              {...animationProps}
              state={state}
              onClick={(e: { stopPropagation: () => any }) =>
                e.stopPropagation()
              }
            >
              {children}
            </S.Lightbox>
          </S.Overlay>
        )}
      </Transition>,
      targetDOM
    )
  );
};
