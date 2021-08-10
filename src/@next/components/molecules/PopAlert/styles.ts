import { styled } from "@styles";

export const Container = styled.div`
  margin-bottom: 1rem;

  ::after {
    bottom: -0.75rem;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 0.75rem solid white;
    content: "";
    left: 3rem;
    position: absolute;
    width: 0;
    z-index: 1;
  }
`;
