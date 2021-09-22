import styled from 'styled-components';
import farmatheme from '@farmatheme';
import { ContainerStyle, media, mediaUp } from '@temp/@next/globalStyles';
import { aunaGrey06, boldFontWeight } from '@temp/@next/globalStyles/constants';

export const SearchPage = styled.div`
  ${ContainerStyle}
  margin-top: 0;
  padding: 0;
  ${mediaUp.largeScreen`
    padding: 1rem 1rem 2rem;
  `}

  .home-page__product {
    &:first-child {
      border-top: 0.0625rem solid ${farmatheme.theme.colors.neutral.medium};
      ${mediaUp.largeScreen`
        border-top: none;
      `}
    }
  }
`;

export const SearchListHeader = styled.div`
  z-index: 1;
  ${mediaUp.largeScreen`
    margin-bottom: 2rem;
    `}

  > div {
    background-color: ${aunaGrey06};
    position: relative;
    ${media.largeScreen`
      margin-bottom: 0;
    `}
  }
`;

export const SearchNoProducts = styled.div`
  font-size: 0.875rem;
  text-align: left;

  ${mediaUp.smallScreen`
    text-align: center;
  `}

  span {
    &:nth-child(2) {
      font-weight: ${boldFontWeight};
    }
  }
`;
