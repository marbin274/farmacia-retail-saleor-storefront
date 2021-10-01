import { styled } from '@styles';

export const Map = styled.div<{ isSetLocation: boolean }>`
  height: 21.25rem;
  width: 100%;
  ${({ isSetLocation }) =>
    !isSetLocation
      ? ''
      : `.centerMarker {
    background-image: url(/assets/auna/map-icon.svg);
    background-repeat: no-repeat;
    cursor: pointer;
    height: 2.8125rem;
    left: 50%;
    margin-left: -1.125rem;
    margin-top: -2.75rem;
    position: absolute;
    top: 50%;
    width: 2.0625rem;
    z-index: 1;
  }`}
`;

export const FullScreenControl = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  box-sizing: border-box;
  border-radius: 2px;
  cursor: pointer;
  display: none;
  font-size: 28px;
  font-weight: 300;
  height: 1em;
  margin: 6px;
  padding: 2px;
  text-align: center;
  user-select: none;
  width: 1em;
  @supports not (-webkit-touch-callout: none) {
    display: initial;
  }

  button {
    display: block;
    font-size: 1em;
    height: 100%;
    width: 100%;
  }

  .fullscreen-control-icon {
    border-style: solid;
    height: 0.25em;
    position: absolute;
    width: 0.25em;
  }

  .fullscreen-control-icon.fullscreen-control-top-left {
    border-width: 2px 0 0 2px;
    left: 0.1em;
    top: 0.1em;
  }
  .is-fullscreen .fullscreen-control-icon.fullscreen-control-top-left {
    border-width: 0 2px 2px 0;
  }

  .fullscreen-control-icon.fullscreen-control-top-right {
    border-width: 2px 2px 0 0;
    right: 0.1em;
    top: 0.1em;
  }
  .is-fullscreen .fullscreen-control-icon.fullscreen-control-top-right {
    border-width: 0 0 2px 2px;
  }

  .fullscreen-control-icon.fullscreen-control-bottom-left {
    border-width: 0 0 2px 2px;
    left: 0.1em;
    bottom: 0.1em;
  }

  .is-fullscreen .fullscreen-control-icon.fullscreen-control-bottom-left {
    border-width: 2px 2px 0 0;
  }

  .fullscreen-control-icon.fullscreen-control-bottom-right {
    border-width: 0 2px 2px 0;
    right: 0.1em;
    bottom: 0.1em;
  }

  .is-fullscreen .fullscreen-control-icon.fullscreen-control-bottom-right {
    order-width: 2px 0 0 2px;
  }
`;
