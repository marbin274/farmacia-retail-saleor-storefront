import { mediaUp, styled } from "@styles";
import farmatheme from "@farmatheme";
export const Wrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.typography.smallFontSize};
  z-index: 1000;
`;

export const SortLine = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;

  span {
    font-size: 0.75rem;
    color: ${farmatheme.theme.colors.neutral.dark};
    ${mediaUp.largeScreen`
      font-size: 0.875rem;
    `}
  }
`;

export const Value = styled.div`
  color: ${props => props.theme.colors.aunaBlack};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #23212b;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 100%;
`;

export const Indicator = styled.div<{ rotate: string }>`
  transition-duration: 0.3s;
  margin-left: 0.625rem;
  transform: ${props =>
    props.rotate === "true"
      ? "rotate(180deg) translateY(0.25rem)"
      : "rotate(0deg) translateY(0.25rem)"};
`;
