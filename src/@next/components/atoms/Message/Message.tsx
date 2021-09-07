import React from 'react';
import { Icon } from '../Icon';
import * as S from './styles';
import { IProps } from './types';

export const Message: React.FC<IProps> = ({
  title,
  status = 'neutral',
  children,
  onClick,
  actionText,
}: IProps) => {
  const isAction = !!actionText;

  return (
    <S.Wrapper status={status} data-cy="alert">
      {title && (
        <S.TopWrapper>
          <S.Title data-testid="message-title">{title}</S.Title>
          {isAction ? (
            !children && (
              <S.ActionButton role="action-button" onClick={onClick}>
                {actionText}
              </S.ActionButton>
            )
          ) : (
            <S.CloseButton role="close-button" onClick={onClick}>
              <Icon name="x" size={15} />
            </S.CloseButton>
          )}
        </S.TopWrapper>
      )}
      {children && (
        <S.Content hasTitle={!!title}>
          {children}
          {!title && !isAction && (
            <S.CloseButton
              role="close-button"
              className="fa-ml-4"
              onClick={onClick}
            >
              <Icon name="x" size={15} />
            </S.CloseButton>
          )}
        </S.Content>
      )}
      {children && isAction && (
        <S.ActionButton
          role="action-button"
          onClick={onClick}
          style={{ marginTop: '1rem' }}
        >
          {actionText}
        </S.ActionButton>
      )}
    </S.Wrapper>
  );
};
