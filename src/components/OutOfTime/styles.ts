import { mediaUp, styled } from "@styles";
import { aunaComplementary1 } from "@temp/@next/globalStyles/constants";
import ReactSVG from "react-svg";

export const Wrapper = styled.div`
  width: calc(100vw - 2rem);
`;

export const BodyTextWrapper = styled.div`
  flex: 2;
`;

export const BodyButtonWrapper = styled.div`
  max-width: 15rem;
`;

export const OutOfTimeIcon = styled(ReactSVG)`
  background-color: ${aunaComplementary1};
  flex: initial;
  margin: 2rem 0;
  > div {
    max-width: 6rem;
    margin: 0 auto;
  }

  ${mediaUp.smallScreen`
    flex: 1;
  `}
`;

export const FooterButtonWrapper = styled.div`
  max-width: 100%;

  ${mediaUp.smallScreen`
    max-width: 14rem;
  `}
`;
