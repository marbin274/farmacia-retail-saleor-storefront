import { styled } from '@styles';

export const Wrapper = styled.div`
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
  padding-top: 3.5rem;
`;

export const SubWrapper = styled.div`
  margin: 0 auto;
  max-width: 14rem;
  width: 100%;
`;

export const Body = styled.div`
  display: block;
  height: calc(100vh - 15.5rem);
  min-width: 14rem;
  overflow: scroll;
  padding-bottom: 2rem;
`;

export const WrapperIconButton = styled.div`
  left: calc(50% + 0.05rem);
  position: absolute;
  top: calc(50% + 0.05rem);
  transform: translate(-50%, -50%);
`;

export const Footer = styled.div`
  padding: 0;
  width: 100%;
`;
