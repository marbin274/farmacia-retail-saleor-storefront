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
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    background: white;
    border: 1px solid #ACA8BD;
    border-radius: 0.5rem;
    box-shadow: 0;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0 1rem;
    height: 2.5rem;
    outline: none!important;
    &:hover {
      border: 1px solid #2F2C3A;
    }
    > div {
      position: absolute;
      right: 1.3rem;
      bottom: 0.6rem;
    }
  }
`
