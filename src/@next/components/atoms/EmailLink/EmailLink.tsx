import React from 'react';
import { ReactSVG } from 'react-svg';
import * as S from './styles';

export interface IProps {
  link: string;
  title?: string;
  showIcon?: boolean;
}

export const EmailLink: React.FC<IProps> = ({
  link,
  title,
  showIcon = true,
}: IProps) => (
  <S.EmailSpan>
    <a href={link}>
      {showIcon && (
        <S.EmailIcon>
          <ReactSVG src="/assets/mail-icon.svg∏" />
        </S.EmailIcon>
      )}
      <span>{title ? title : link}</span>
    </a>
  </S.EmailSpan>
);
