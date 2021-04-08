import { styled } from "@styles";

export const Wrapper = styled.div`
  > div {
    width: 100%;
  }
`

export const ErrorMessages = styled.div`
  top: 100%;
`;

export const ButtonSelectDate = styled.div`
  > button {   
    border: 0.063rem solid ${({theme}) => theme.colors.aunaInputGray };
    border-radius: .25rem;
    height: 3.038rem;
    padding: 1rem;
    text-align: left;
    width: 100%;
    &:hover {
      border: 1px solid ${({theme}) => theme.input.borderColorActive };
    }
    > div {
      position: absolute;
      right: 1.3rem;
      bottom: 0.6rem;
    }
  }
`
