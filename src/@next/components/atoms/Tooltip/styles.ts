import { styled } from "@styles";
import { IProps } from "./types";
export const TooltipWrapper = styled.div`
  position: relative;
  &:hover {
    span {
      &:nth-child(1) {
        visibility: visible;
      }
    }
  }
`;

type TooltipTextType = Omit<IProps, "children" | "text" | "className">;

export const TooltipText = styled.span<TooltipTextType>`
  width: 4.5rem;
  visibility: hidden;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  font-size: 0.875rem;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: calc(-2.25rem + 50%);

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -0.3125rem;
    border-width: 0.3125rem;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;
