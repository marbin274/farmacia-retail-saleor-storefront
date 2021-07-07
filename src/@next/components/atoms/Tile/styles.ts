import { styled } from "@styles";
import { css } from "styled-components";
import farmatheme from "@farmatheme";
interface WrapperProps {
  readonly tileType?: "hover" | "addNew";
}

export const Wrapper = styled.div<WrapperProps>`
  border: 1px transparent solid;
  overflow: auto;
  height: 100%;
  padding: 0;
  transition: all 0.3s, color 0s, fill 0s;
  border-radius: 1.5rem;
  background: ${farmatheme.theme.colors.neutral.lightest};
  display: flex;
  flex-direction: column;
  align-items: left;
  ${props => {
    if (props.tileType === "hover") {
      return css`
        :hover {
          cursor: pointer;
          border-color: ${props.theme.tile.hoverBorder};
        }
      `;
    }
    if (props.tileType === "addNew") {
      return css`
        align-items: center;
        justify-content: center;
        :hover {
          cursor: pointer;
          background-color: ${farmatheme.theme.colors.primary.lightest};
          svg path {
            fill: ${props.theme.colors.white};
          }
        }
      `;
    }
  }};
`;

Wrapper.displayName = "Tile";

export const Header = styled.div`
  padding: 1.5rem 1.5rem 1rem 2rem;
`;

export const Content = styled.div<WrapperProps>`
  padding: ${props =>
    props.tileType === "addNew" ? "1rem" : "0 1.5rem 1.5rem 2rem"};
`;

export const Footer = styled.div`
  margin-top: auto;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;
