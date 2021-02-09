import { media, styled } from "@styles";
import {
  aunaBlack,
  aunaComplementary1,
  aunaInteractive,
} from "@styles/constants";
import closeImg from "images/modal-close.svg";
import underConstructionImg from "images/auna/under-construction.svg";

export const Wrapper = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  height: 20rem;
  max-width: 70rem;
  width: calc(100vw - 2rem);

  ${media.smallScreen`
    top: 8rem;
  `}
`;

export const Card = styled.div`
  background: white;
  border-radius: 1rem;
  display: flex;
  padding: 2rem 3rem 2rem 2rem;
  border: solid 1px lightgray;

  ${media.smallScreen`
    flex-direction: column;
  `}
`;

export const CardText = styled.div`
  font-size: 1rem;
  padding-right: 1rem;

  p {
    padding: 0.7rem 0;
  }

  a {
    color: ${aunaInteractive};
  }
`;

export const CardHeader = styled.h3`
  font-weight: bolder;
  font-size: 1.2rem;
  position: relative;
  top: -0.5rem;
`;

export const CardImageContainer = styled.div`
  background-color: ${aunaComplementary1};
  border-radius: 1rem;
  min-height: 10rem;
  min-width: 16rem;
  padding: 2rem 0;
`;

export const CardImage = styled.div`
  width: 10rem;
  margin: 0 auto;
  > div {
    width: 100%;
  }
  svg {
    width: 100%;
  }
`;

export const CloseButton = styled.div`
  color: ${aunaBlack};
  cursor: pointer;
  height: 1rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1rem;

  &:hover {
    color: ${aunaInteractive};
  }
`;

export const closeIcon = closeImg;
export const underConstructionIcon = underConstructionImg;
