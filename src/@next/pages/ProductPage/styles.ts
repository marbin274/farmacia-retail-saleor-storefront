import { ContainerStyle, mediaUp, styled } from '@styles';
import farmatheme from '@farmatheme';
import { containerWidth, hrColor } from '@temp/@next/globalStyles/constants';

export const ProductPage = styled.div`
  background-color: ${farmatheme.theme.colors.neutral.light};
  z-index: 0;
`;

export const BreadcrumbsContainer = styled.div`
  background-color: ${farmatheme.theme.colors.neutral.light};
  margin: 0 auto;
  max-width: 100vw;
  position: relative;
  width: ${containerWidth};
  z-index: 2;

  ${mediaUp.largeScreen`
    padding: 1.5rem 1rem;
    position: initial;
    z-index: 0;
  `};
`;

export const Container = styled.div`
  z-index: 1;
  ${ContainerStyle};
  margin: 1rem auto 0 auto;

  ${mediaUp.smallScreen`
    margin: 1.5rem auto 0 auto;
  `};

  ${mediaUp.largeScreen`
    margin: 0.5rem auto 0 auto;
  `};
`;

export const ProductWrapper = styled.div`
  display: block;
  padding-bottom: 2rem;

  ${mediaUp.largeScreen`
    display: flex;
    padding-bottom: 3rem;
  `}

  hr {
    border-color: ${hrColor};
    margin: 1.5rem 0;
    max-width: 30rem;
  }
`;

export const ProductImageWrapper = styled.div`
  width: 100%;
  ${mediaUp.largeScreen`
    position: sticky;
    top: 6rem;
    align-self: flex-start;  
  `}
`;

export const ProductInfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaUp.largeScreen`
    margin-left: 2.5rem;
    width: ${containerWidth};
  `};
`;

export const ProductInfoFixedWrapper = styled.div`
  width: 100% !important;
`;

export const SkeletonContainer = styled.div`
  ${ContainerStyle}
`;

export const SkeletonProduct = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  ${mediaUp.smallScreen`
    flex-direction: row;
  `};
  > div {
    margin: 1.5rem 2rem;
    ${mediaUp.smallScreen`
      flex: 1;
    `};
    &:first-child {
      height: 15rem;
      ${mediaUp.smallScreen`
        height: 40rem;    
      `};
    }
  }
`;

export const SkeletonDescription = styled.div`
  > div {
    &:last-child {
      margin-top: 3rem;
    }
  }
`;
