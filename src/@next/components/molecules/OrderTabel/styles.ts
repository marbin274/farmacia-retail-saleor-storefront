import { media, styled } from "@styles";

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
  width: 15%;
  opacity: 0;

  ${media.largeScreen`
     width: 15%;
     opacity: 1;

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
  font-size: 0.875rem;
  border-top: 1px solid ${props => props.theme.colors.tableDivider};

  &:hover {
    background-color: white;
    border-radius: 0.5rem;
    border-top-color: transparent;

    + ${BaseRow} {
      border-top-color: transparent;
    }

    ${Action} {
      opacity: 1;
    }
  }

  :last-child {
    border-bottom: 1px solid ${props => props.theme.colors.tableDivider};

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
`;

export const IndexNumber = styled.div`
  width: 15%;
  ${media.largeScreen`
     width: 60%;
  `}
`;

export const ProductsOrdered = styled.div`
  width: 25%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  img {
    max-width: 50px;
    height: auto;
  }
`;

export const DateOfOrder = styled.div`
  width: 16%;
`;

export const Value = styled.div`
  width: 18%;
`;

export const Status = styled.div`
  width: 16%;
  text-align: left;
  ${media.largeScreen`
     width: 50%;
  `}
`;
