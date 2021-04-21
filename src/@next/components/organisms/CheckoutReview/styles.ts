import { media, styled } from "@styles";
import { aunaBrand3, aunaBlack, aunaGrey100 } from "@styles/constants";

export const Wrapper = styled.div`
  div:nth-child(2) {
    margin-bottom: 1rem;
  }

  .privacyAndPolicies {
    margin-top: 2rem;
    width: 50%;
    ${media.smallScreen`
      width: 100%;
    `}

    a {
      color: ${aunaBrand3};
    }
  }

  .additionals {
    margin-top: 2rem;
    width: 50%;
    ${media.smallScreen`
      width: 100%;
    `}

    a {
      color: ${aunaBrand3};
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  ${media.smallScreen`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const ErrorMessages = styled.div`
  margin-top: 30px;
`;

export const Title = styled.h4`
  color: ${aunaBrand3};
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: 0.625rem;
`;

export const MainTitle = styled.h3`
  color: ${aunaBlack};
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: 0.625rem;
`;

export const Text = styled.p`
  color: ${aunaGrey100};
  font-size: ${({theme}) => theme.typography.smallFontSize};
  font-weight: 300;
  line-height: 1.875rem;
`;

export const TextBold = styled.span`
  font-weight: 600;
  color: ${aunaBlack};
  font-size: ${({theme}) => theme.typography.smallFontSize};
`;

export const SubTitle = styled.p`
  color: ${aunaBlack};
  margin-bottom: 1rem;
  font-size: ${({theme}) => theme.typography.smallFontSize};
  font-weight: ${({theme}) => theme.typography.normalFontWeight};
`;

export const ImportantText = styled(Text)`
  color: ${aunaBlack};
`;
