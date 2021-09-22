import classNames from 'classnames';
import * as React from 'react';
import * as S from './styles';

interface MessageProps {
  title: string;
  status?: 'success' | 'error';
  onClose: () => void;
}

const Message: React.FC<MessageProps> = ({
  title,
  status = 'neutral',
  children,
  onClose,
}) => (
  <S.Wrapper
    className={classNames(
      'fa-w-100 fa-p-6 fa-bg-neutral-lightest fa-fixed fa-bottom-4 fa-right-4 message',
      {
        'fa-border-primary-medium': status === 'success',
        'fa-border-error-medium': status === 'error',
      }
    )}
  >
    <p className="fa-uppercase fa-font-semibold fa-mr-6">{title}</p>
    {children ? <div className="fa-mt-4">{children}</div> : null}
    <S.CloseIcon src="/assets/x.svg" onClick={onClose} />
  </S.Wrapper>
);

export default Message;
