import * as React from 'react';
import ReactSVG from 'react-svg';
import * as S from './styles';

interface Medium {
  ariaLabel: string | '';
  path?: string;
  href: string;
  rel: string;
}

export interface IconProps extends React.HTMLProps<HTMLAnchorElement> {
  medium: Medium;
  target?: string;
}

const SocialMediaIcon: React.FC<IconProps> = ({ medium, target }) => (
  <S.SocialIconWrapper
    className="fa-py-4 fa-px-2"
    href={medium.href}
    target={target || '_blank'}
    aria-label={medium.ariaLabel}
    rel={medium.rel}
  >
    <ReactSVG path={medium.path} className="social-icon" />
  </S.SocialIconWrapper>
);

export default SocialMediaIcon;
