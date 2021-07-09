import { mediaUp, styled } from "@styles";
import farmatheme from "@farmatheme";
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.typography.smallFontSize};
  width: auto;
  z-index: 1000;
`;

export const SortLine = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;

  span {
    color: ${farmatheme.theme.colors.neutral.dark};
    font-size: 0.75rem;
    margin: 0rem 0.5rem;
    ${mediaUp.largeScreen`
      font-size: 0.875rem;
    `}
  }
`;

export const Value = styled.div`
  color: #23212b;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Indicator = styled.div<{ rotate: string }>`
  margin-left: 0.625rem;
  transform: ${props =>
    props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
  transition-duration: 0.3s;
`;
