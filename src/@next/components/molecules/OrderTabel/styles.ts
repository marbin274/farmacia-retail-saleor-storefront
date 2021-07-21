import { media, mediaUp, styled } from "@styles";
import farmatheme from "@farmatheme";

export const Wrapper = styled.div``;

const BaseRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 5rem;
  cursor: pointer;
`;

export const Action = styled.div`
  opacity: 0;
  width: 8%;

  ${media.largeScreen`
    opacity: 1;
    width: 8%;
    img {
      width: 0.75rem;
    }
  `}

  button {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;

    span {
      font-size: 0.75rem;
    }
  }
`;

export const Row = styled(BaseRow)`
  border-radius: 2.5rem;
  font-size: 0.875rem;
  padding-left: 1rem;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: ${farmatheme.theme.colors.neutral.light};
    border-top-color: transparent;

    + ${BaseRow} {
      border-top-color: transparent;
    }

    ${Action} {
      opacity: 1;
    }
  }

  :last-child {
    &:hover {
      border-bottom-color: transparent;
    }
  }

  :first-child {
    border-top: 0;
  }
`;

export const HeaderRow = styled(BaseRow)`
  color: ${props => props.theme.colors.lightFont};
  cursor: default;
  font-size: 0.75rem;
  padding-left: 1rem;
`;

export const IndexNumber = styled.div`
  text-align: left;
  width: 15%;
  ${media.largeScreen`
    padding-right: 1rem;
    width: 32%;
  `}
`;

export const ProductsOrdered = styled.div`
  display: grid;
  flex-wrap: nowrap;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 0.5rem;
  justify-content: flex-start;
  width: 25%;
  
  img {
    max-width: 2rem;
    max-height: 2rem;
  }
`;

export const DateOfOrder = styled.div`
  text-align: left;
  width: 17%;
`;

export const Value = styled.div`
  text-align: left;
  width: 18%;
`;

export const Status = styled.div`
  text-align: left;
  width: 60%;
  ${mediaUp.largeScreen`
    width: 22%;
  `}
`;
