import { styled } from "@styles";

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
`;

export const Value = styled.div`
  color: ${props => props.theme.colors.aunaBlack};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0.625rem;
`;

export const Indicator = styled.div<{ rotate: string }>`
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true"
      ? "rotate(180deg) translateY(-0.25rem)"
      : "rotate(0deg)"};
  margin-top: -0.25rem;
`;
