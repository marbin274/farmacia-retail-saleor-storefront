import { mediaUp, media } from '@temp/@next/globalStyles';
import { largeScreen } from '@temp/@next/globalStyles/constants';
import { css, keyframes } from 'styled-components';
import { styled } from '@styles';
import { addressLocationType } from './types';
import farmatheme from '@farmatheme';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
  ${mediaUp.largeScreen`
        padding: 0rem;
        width: 18rem;
    `}
`;

export const Localization = styled.div<{ mode: addressLocationType }>`
  color: ${({ mode, theme }) =>
    mode === 'ligth' ? theme.colors.white : theme.colors.aunaBlack};
  display: flex;
  flex: 3;
`;

export const GeocalizationIcon = styled.div`
  .icon_button {
    height: 2.5rem;
    margin: 0.2rem 0rem;
    width: 2.5rem;
  }
`;

export const District = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 0.5rem;
  max-width: 10rem;
  color: ${farmatheme.theme.colors.white};
  ${mediaUp.xSmallScreen`
        max-width: 12rem;
    `}
  ${mediaUp.smallScreen`
        max-width: 100%;
    `}
    ${mediaUp.largeScreen`
        max-width: 8.125rem;
    `}

    ${media.largeScreen`
        align-items: center;
        flex-direction: row;
    `};
`;

export const Label = styled.span`
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.labelFontSize};
  font-weight: normal;
  min-width: 3.125rem;
`;

export const Address = styled.span`
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${media.largeScreen`
    margin-left: 0.5rem
  `};
`;

export const Button = styled.div`
  color: #fff;

  ${mediaUp.largeScreen`
    flex: 1;
  `};

  > button {
    color: ${farmatheme.theme.colors.white};
    border: 1px solid ${farmatheme.theme.colors.white};
    width: 100%;
    span {
      margin-left: 0;
      font-size: ${({ theme }) => theme.typography.smallFontSize};
    }
  }
`;

const alertTop = 1;
const alertMove = 0.4;
const alertAnimation = 3.055;

const moved = keyframes`
    0%   {top:${alertTop}rem;}
    ${alertAnimation * 1}%  {top:${alertTop + alertMove}rem;}
    ${alertAnimation * 2}%  {top:${alertTop}rem}
    ${alertAnimation * 3}%  {top:${alertTop + alertMove}rem;}
    ${alertAnimation * 4}%  {top:${alertTop}rem}
    ${alertAnimation * 5}%  {top:${alertTop + alertMove}rem;}
    ${alertAnimation * 6}%  {top:${alertTop}rem}
`;

export const AlertWrapper = styled.div`
  height: 13rem;
  position: absolute;
  right: -0.8rem;
  top: 2.1rem;
  width: 18rem;
  z-index: 1;

  ${mediaUp.xSmallScreen`
    width: 20rem;
  `}
  ${mediaUp.xxSmallScreen`
    width: 23rem;
    right: 0rem;
  `}
  ${mediaUp.largeScreen`
    left: -5rem;
    right: auto;
  `}
  ${`@media (min-width: ${largeScreen}px) and (max-width: 1144px){
      left: -4rem;
      width: 22rem;
    }
  `}
`;

export const Alert = styled.div`
  box-shadow: 0px 0px 0.875rem rgb(0 0 0 / 50%);
  top: 1rem;
  ${css`
        animation: ${moved};
        animation-delay: 4s;
        animation-duration: 12s;
        animation-iteration-count: infinite
        animation-timing-function: ease-in-out;
    `}
  ::after {
    border-color: transparent transparent white transparent;
    border-style: solid;
    border-width: 0.7rem;
    content: ' ';
    position: absolute;
    right: 3rem;
    top: -1.375rem;
    z-index: 1;
  }

  ${mediaUp.xSmallScreen`     
        ::after {
            right: 2rem;
        }
    `}
`;

export const AlertIcon = styled.div`
  align-items: center;
  border-radius: 1rem;
  display: flex;
  flex: 0;
  height: 3.5rem;
  justify-content: flex-start;
  padding: 0 0.5rem 0 0;
  width: auto;
`;

export const AlertText = styled.span`
  flex: 3;
`;
