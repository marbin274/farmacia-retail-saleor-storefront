import farmatheme from '@farmatheme';
import { defaultTheme, media, mediaUp, styled } from '@styles';
import { aunaDisabled, aunaPrimary, white } from '@styles/constants';
import { DOT_STATUS } from './';

export const ICON_COLORS = [
  aunaDisabled, // INACTIVE
  aunaPrimary, // ACTIVE
  white, // DONE
];

export const ICON_BG_COLORS = [
  white, // INACTIVE
  white, // ACTIVE
  aunaPrimary, // DONE
];

export const flexCentered = {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
};

export const Dot = styled.div<{ status: DOT_STATUS }>`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: ${(props) =>
    props.status === DOT_STATUS.INACTIVE
      ? '#008A66'
      : farmatheme.theme.colors.interactive};
  border-radius: 50%;
  display: flex;
  align-items: center;
  color: white;

  span {
    margin: auto;
    font-size: 0.875rem;
    line-height: 0.875rem;
  }

  svg {
    margin: auto;
  }
`;

export const DotStatus = styled.p<{ status: DOT_STATUS }>`
  display: block;
  position: absolute;
  width: 8.875rem;
  top: 2rem;
  left: -3.75rem;
  text-align: center;
  font-weight: 600;

  ${media.mediumScreen`
    display: none;
  `};

  ${({ status }) =>
    status === DOT_STATUS.INACTIVE &&
    `
    color: #A8F0DD;
  `}
`;

export const Label = styled.div`
  display: none;
  ${media.mediumScreen`
    color: ${white};
    white-space: pre;
    display: block;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    line-height: 1rem;
    padding-top: 0.5rem;
    text-align: center;
  `};
`;

export const ProgressBar = styled.div<{ done?: boolean }>`
  z-index: 0;
  width: calc(100% - 1.5rem);
  height: 4px;
  background-color: ${(props) =>
    props.done ? farmatheme.theme.colors.interactive : '#008A66'};
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-child) {
    width: 100%;
  }

  span {
    cursor: not-allowed;
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 23em;
  position: relative;
  width: 80%;
  ${mediaUp.smallScreen`
    margin-bottom: 2rem;
  `};
`;

export const GoBack = styled.div`
  position: absolute;
  left: 5%;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 1.5rem;
  color: #ffffff;
  cursor: pointer;

  span {
    margin-left: 1rem;
  }

  ${media.mediumScreen`
    display: none;
  `};

  @media (min-width: ${defaultTheme.grid.containerWidth}px) {
    left: calc((100vw - ${defaultTheme.grid.containerWidth}px) / 2 + 1rem);
  }
`;
