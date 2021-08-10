import { DefaultTheme, media, mediaUp, styled } from "@styles";
import {
  aunaInteractive,
  aunaComplementary1,
  aunaBlack,
  aunaBrand3,
  aunaGrey20,
  turquoise,
} from "@styles/constants";
import farmatheme from "@farmatheme";

export const CartSummaryContainer = styled.div`
  ${mediaUp.mediumScreen`
    flex: 1;
  `}
`;
export const Wrapper = styled.div<{ mobileCartOpened: boolean }>`
  background-color: ${aunaGrey20};
  ${media.smallScreen`
    background-color: ${(props: any) =>
      props.mobileCartOpened ? "#fff" : aunaComplementary1};
  `}
  overflow-y: auto;
  overflow-x: hidden;  

  ${mediaUp.mediumScreen`
    flex: 1;
    background-color: initial;
  `}
  ${media.mediumScreen`
    width: 100%;
    height: 100%;
    position: fixed;
    top: calc(100% - 5.375rem);
    left: 0%;
    transition: all 0.5s ease;
    position: fixed;
    bottom: 0;
  `}
  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    top: 5rem;
    padding-bottom: 4.375rem;
  `}
  ${props =>
    !props.mobileCartOpened &&
    media.mediumScreen`
    height: 6.25rem;
    overflow: hidden;
  `}

  hr {
    border-color: #F7F6F8;
  }
`;
export const Content = styled.div`
  height: calc(100% - 5.5rem);
`;

export const CartSummaryProductList = styled.div`
  height: calc(100% - 6.625rem);
  padding: 0 1.25rem;
  overflow: auto;
`;

export const ProductLine = styled.div`
  padding: 1rem 0.7rem 1rem 0rem;
`;

export const ShowCart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.875rem 1rem;
  width: 7.5625rem;
  height: 3rem;
  left: calc(50% - 7.5625rem / 2 + 6.0625rem);
  top: calc(50% - 3rem / 2);
  border: 0.0625rem solid ${turquoise};
  box-sizing: border-box;
  border-radius: 1.5rem;
  color: ${turquoise};
`;

export const BadgeCartWrapper = styled.div`
  ${media.smallScreen`
    display:flex;
    flex-direction: row;
  `}
`;

export const Header = styled.div<{ mobileCartOpened: boolean }>`
  background-color: #e8fcf7;
  align-items: center;
  padding: 1.875rem 0 1.375rem 1.5rem;
  display: flex;
  justify-content: space-between;
  ${mediaUp.mediumScreen`
  margin-bottom: 1rem;
  `}
  ${media.smallScreen`
    align-items: ${(props: any) =>
      props.mobileCartOpened ? "flex-start" : "center"};
    flex-direction: column;
    padding-right: 0.9375rem;
    padding: 1rem 2.25rem 1.5rem;
  `}
`;
export const Block = styled.div<{
  position: number;
}>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  width: ${(props: any) => (props.position === 1 ? "fit-content" : "100%")};
  ${media.mediumScreen`  
    margin: ${(props: any) =>
      props.position === 2 ? "0 0 30px 1.5rem" : "16px 16px 0 auto"};
  `}
  ${media.smallScreen`
  margin: ${(props: any) => (props.position === 2 ? "0" : "1rem 1rem 0 auto")};
  `}

  button {
    span {
      margin-left: 0;
    }
  }
`;
export const Title = styled.div<{ mobileCartOpened: boolean }>`
  display: flex;
  margin: 0;
  font-weight: 500;
  font-size: ${({ theme }: { theme: DefaultTheme }) =>
    theme.typography.h4FontSize};
  color: ${aunaBrand3};
  ${mediaUp.mediumScreen`
    color: ${({ theme }: { theme: DefaultTheme }) =>
      theme.colors.shippingMethodBlack}
    font-size: ${({ theme }: { theme: DefaultTheme }) =>
      theme.typography.baseFontSize}
    font-weight: ${({ theme }: { theme: DefaultTheme }) =>
      theme.typography.boldFontWeight}
  `}
  ${media.mediumScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
    cursor: pointer;
  `}
  ${media.smallScreen`
    font-size: ${(props: any) =>
      props.mobileCartOpened ? "1.375rem" : "1.125rem"};
    color: ${(props: any) => (props.mobileCartOpened ? aunaBrand3 : aunaBlack)};
  `}
`;

export const TitleIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #00bf8e;
  border-radius: 50%;
  display: flex;
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.white};
  svg {
    margin: auto;
  }
`;

export const TitleText = styled.div`
  margin-left: 1.5rem;
  span {
    display: block;
    color: #23212b;
    &:nth-child(1) {
      font-size: ${({ theme }: { theme: DefaultTheme }) =>
        theme.typography.h3FontSize};
      font-weight: ${({ theme }: { theme: DefaultTheme }) =>
        theme.typography.boldFontWeight};
      line-height: 2rem;

      ${media.smallScreen`
        font-size: 1rem;
      `}
    }
    &:nth-child(2) {
      margin-top: 0.25rem;
      font-size: ${({ theme }: { theme: DefaultTheme }) =>
        theme.typography.baseFontSize};
      font-weight: 500;
      line-height: ${({ theme }: { theme: DefaultTheme }) =>
        theme.typography.h3FontSize};

      ${media.smallScreen`
        font-size: 0.75rem;
        line-height: 0.75rem;
      `}
    }
  }

  ${media.smallScreen`
    margin-left: 1rem;
  `}
`;
export const Text = styled.span<{ mobileCartOpened: boolean }>`
  font-weight: 400;
  font-size: 0.75rem;
  ${media.smallScreen`
    font-size: ${(props: any) =>
      props.mobileCartOpened ? "0.875rem" : "0.75rem"};
  `}
  margin: 2px 0 0 3px;
`;
export const Close = styled.div<{ mobileCartOpened: boolean }>`
  height: 2rem;
  width: 2rem;
  align-self: flex-start;
  display: flex;
  color: white;
  background-color: ${farmatheme.theme.colors.interactive};
  border-radius: 50%;
  color: #fff;

  svg {
    margin: auto;
    path {
      transform: translate(0.125rem, 0.125rem);
    }
  }
`;
export const HeadClose = styled.div<{ mobileCartOpened: boolean }>`
  display: none;
  ${media.mediumScreen`
    display: ${(props: any) => (props.mobileCartOpened ? "flex" : "none")};
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  `}
`;
export const CostLine = styled.div<{ last: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${(props: any) => (props.last ? 500 : "normal")};
  font-size: ${(props: any) => (props.last ? "0.875rem" : "0.75rem")};
  ${media.smallScreen`
    font-size: ${(props: any) => (props.last ? "1.25rem" : "0.75rem")};
  `};

  color: ${props => (props.last ? "#121314" : "#9B9B9B")};

  span  {
    font-weight: 600;
    font-size: 1rem;
  }
`;

export const CostLineLabel = styled.span`
  font-size: 0.875rem;
  ${media.smallScreen`
    font-size: 1rem;
  `}
`;

export const CostTotalWrapper = styled.div`
  width: 100%;
  height: 5.625rem;
  background-color: #f7f6f8;
  display: flex;
  padding: 0 4.25rem;
  ${mediaUp.mediumScreen`
    display: none;
  `}
`;

export const Costs = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`;
export const CartModifier = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 16px 0 20px 0;

  @media (min-width: 721px) and (max-width: 1105px) {
    justify-content: center;
  }
`;
export const Link = styled.a<{ type?: string }>`
  align-items: center;
  background-color: ${props =>
    props.type === "button" ? aunaComplementary1 : ""};
  border-radius: 40px;
  color: ${aunaInteractive};
  display: flex;
  padding: 16px;
  min-width: fit-content;

  > div {
    margin-left: 24px;
  }
`;
