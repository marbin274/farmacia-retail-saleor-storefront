import { styled } from '@styles';

export const Map = styled.div`
  height: 21.25rem;
  width: 100%;
  .centerMarker {
    background: url(/assets/auna/map-icon.svg) no-repeat;
    cursor: pointer;
    height: 2.8125rem;
    left: 50%;
    margin-left: -0.625rem;
    margin-top: -2.125rem;
    position: absolute;
    top: 50%;
    width: 2.0625rem;
    z-index: 1;
  }
`;
