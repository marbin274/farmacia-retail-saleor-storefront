import { DefaultTheme, media, styled } from "@styles";
import {
  aunaInteractive,
  aunaComplementary1,
  aunaBlack,
  aunaBrand3,
  aunaGreyDark,
  aunaGrey20,
  aunaComplementary4,
  turquoise
} from "@styles/constants";
// import { StringValueNode } from "graphql";

export const Wrapper = styled.div<{ mobileCartOpened: boolean }>`
  background-color: ${ props => props.mobileCartOpened ? aunaGrey20 : aunaComplementary1};
  border: 1px solid ${aunaComplementary4};
  border-radius: 16px;
  overflow-y: auto;
  overflow-x: hidden;

  ${media.mediumScreen`
    width: 100%;
    height: 100%;
    position: fixed;
    top: calc(100% - 86px);
    left: 0%;
    transition: all 0.5s ease;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  `}
  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    top: 56px;
    padding-bottom: 70px;
  `}
  ${props =>
    !props.mobileCartOpened &&
    media.mediumScreen`
    height: 100px;
    overflow: hidden;
  `}
`;
export const Content = styled.div`
  padding: 0 20px 32px 20px;
`;

export const ProductLine = styled.div`
  padding: 30px 0;
`;

export const CartSummaryProductList = styled.div`
  margin-bottom: 17px;
`;

export const ShowCart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.875rem 1rem;
  width: 7.5625rem;
  height: 3rem;
  left: calc(50% - 7.5625rem/2 + 6.0625rem);
  top: calc(50% - 3rem/2);
  border: 0.0625rem solid ${turquoise};
  box-sizing: border-box;
  border-radius: 1.5rem;
  color: ${turquoise};
`;

export const BadgeCartWrapper = styled.div`
    display:flex;
    flex-direction: row;
`;


export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${aunaGreyDark};
  margin: 0;
  padding: 0;
`;

export const Header = styled.div<{mobileCartOpened: boolean}>`
  align-items: ${props=> props.mobileCartOpened ? "flex-start" : "center"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Block = styled.div<{
  position: number;
}>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: ${props =>
    props.position === 2 ? "0 1.5rem 1.875rem 1.5rem" : "16px 16px 0 auto"};
  width: ${props =>
    props.position === 1 ? "fit-content" : "-webkit-fill-available"};
`;
export const Title = styled.div<{mobileCartOpened: boolean}>`
  display: flex;
  flex-direction: column;
  color: ${props => props.mobileCartOpened ? aunaBrand3 : aunaBlack};
  margin: 0;
  font-weight: 500;
  padding-left: 0.625rem;
  ${media.mediumScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
    cursor: pointer;
  `}
  ${media.smallScreen`
  font-size: ${(props: any) => props.mobileCartOpened ? "1.375rem" : "1.125rem"};
`}
`;

export const Text = styled.span<{ mobileCartOpened: boolean }>`
  font-weight: 300;
  font-size: ${props => props.mobileCartOpened ? "0.875rem" : "0.75rem"};
  margin: 2px 0 0 3px;
`;
export const Close = styled.div<{ mobileCartOpened: boolean }>`
  display: none;
  ${media.mediumScreen`
    display: ${(props: any) => (props.mobileCartOpened ? "unset" : "none")};
    margin-bottom: 8px;
  `}
`;
export const HeadClose = styled.div<{ mobileCartOpened: boolean }>`
    display: none;
    ${media.mediumScreen`
      display: ${(props: any) => (props.mobileCartOpened ? "flex" : "none")};
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: 1.25rem 1.25rem 0 1.25rem;
    `}
`;
export const CostLine = styled.div<{ last: boolean }>`
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  font-weight: ${props => (props.last ? 500 : "normal")};
  font-size: ${props => (props.last ? "1.25rem" : "0.75rem")};
  color: ${props => (props.last ? "#121314" : "#9B9B9B")};
`;

export const CostLineLabel = styled.span`
  font-size: 1rem;
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
