import { mediaUp, styled } from "@styles";
import { blue } from "@styles/constants";

export const NotFoundText = styled.h2`
  font-size: 9rem;
  font-family: "Montserrat";
  line-height: 100%;
  color: ${blue};

  ${mediaUp.smallScreen`
    font-size: 15rem;
  `}
`;

export const RulerContent = styled.div`
  background-color: ${blue};
  min-width: 2rem;
  height: 0.125rem;
`;
