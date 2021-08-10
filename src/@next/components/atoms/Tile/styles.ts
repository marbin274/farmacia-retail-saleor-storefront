import { styled } from "@styles";
import { css } from "styled-components";
import farmatheme from "@farmatheme";
interface WrapperProps {
  readonly tileType?: "hover" | "addNew";
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: left;
  background: ${farmatheme.theme.colors.neutral.lightest};
  border: 1px transparent solid;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  padding: 0;
  transition: all 0.3s, color 0s, fill 0s;
  ${props => {
    if (props.tileType === "hover") {
      return css`
        :hover {
          border-color: ${props.theme.tile.hoverBorder};
          cursor: pointer;
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
  padding: 1.5rem 1.5rem 1rem 1.5rem;
`;

export const Content = styled.div<WrapperProps>`
  padding: ${props =>
    props.tileType === "addNew" ? "1rem" : "0 1.5rem 1.5rem 1.5rem"};
`;

export const Footer = styled.div`
  margin-top: auto;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;
