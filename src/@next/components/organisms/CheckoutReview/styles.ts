import { styled } from "@styles";
import { aunaBlack } from "@styles/constants";

export const Wrapper = styled.div`
  text-align: center;
`;

export const MainTitle = styled.h3`
  color: #452fba;
  font-size: 1.5rem;
  line-height: 2.25rem;
  font-weight: 600;
`;

export const Title = styled.h4`
  color: #452fba;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  line-height: 200%;
  &.secondary {
    margin-top: 2rem;
  }
`;

export const Text = styled.p`
  color: #131336;
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: 400;
  line-height: 2.125rem;
`;

export const TextBold = styled.span`
  font-weight: 600;
`;

export const SubTitle = styled.p`
  color: ${aunaBlack};
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: ${({ theme }) => theme.typography.normalFontWeight};
`;

export const ImportantText = styled(Text)`
  color: ${aunaBlack};
`;
