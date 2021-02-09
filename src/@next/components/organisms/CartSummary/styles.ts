import { DefaultTheme, media, styled } from "@styles";
import {
  aunaInteractive,
  aunaComplementary1,
  aunaBrand3,
  aunaGrey20,
  aunaComplementary4,
} from "@styles/constants";
// import { StringValueNode } from "graphql";

export const Wrapper = styled.div<{ mobileCartOpened: boolean }>`
  background-color: ${aunaGrey20};
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

export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${aunaComplementary1};
  margin: 0;
  padding: 0;
`;

export const Header = styled.div`
  align-items: center;
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
    props.position === 2 ? "0 0 30px 24px" : "16px 16px 0 auto"};
  width: ${props =>
    props.position === 1 ? "fit-content" : "-webkit-fill-available"};
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: ${aunaBrand3};
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  ${media.mediumScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
    cursor: pointer;
  `}
`;
export const Text = styled.span`
  font-weight: 300;
  font-size: 12px;
  margin: 2px 0 0 13px;
`;

export const Close = styled.div<{ mobileCartOpened: boolean }>`
  display: none;
  ${media.mediumScreen`
    display: ${(props: any) => (props.mobileCartOpened ? "unset" : "none")};
    margin-bottom: 8px;
  `}
`;
export const CostLine = styled.div<{ last: boolean }>`
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  font-weight: ${props => (props.last ? 500 : "normal")};
  font-size: ${props => (props.last ? "14px" : "12px")};
  color: ${props => (props.last ? "#121314" : "#9B9B9B")};
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
