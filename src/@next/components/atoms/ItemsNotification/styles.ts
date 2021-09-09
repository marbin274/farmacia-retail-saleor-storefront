import { media, mediaUp, styled } from '@styles';
import { baseFontSize, black, smallFontSize } from '@styles/constants';

export const NotificationContainer = styled.div`
  margin: auto;
  position: fixed;
  padding: 0;
  right: 1rem;
  top: 5rem;
  z-index: 1000;
  ${mediaUp.smallScreen`
    right: 2rem;
  `}
`;

export const ItemNotification = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1rem 1.5rem 1.5rem;
  right: 0;
  min-width: 27.875rem;
  max-width: 20%;
  border-radius: 1rem;
  color: black;
  background: #ffffff;
  box-shadow: 0 0.5rem 1rem rgba(144, 139, 167, 0.2);

  ${media.smallScreen`
    width: 100%;
    max-width: 100%;
    min-width: 0;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-radius: 1rem 1rem 0 0;
  background: #ffffff;
  font-size: ${baseFontSize};

  button {
    width: 2rem !important;
    height: 2rem !important;
    padding: 0;
    background: #f7f6f8;

    span {
      width: auto;
      height: auto;
      svg {
        path {
          fill: ${black};
        }
      }
    }

    &:hover {
      background: #f7f6f8;
    }

    &:active {
      box-shadow: none;
      background: #f7f6f8;
    }

    ${media.smallScreen`
    padding: 0;
    width: 10%;
    `}
  }
`;

export const HeaderTitleEvent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #008428;

  p {
    font-weight: 500;
    color: #008428;
    line-height: 1rem;
    font-size: ${baseFontSize};
  }
`;

export const HeaderCheckContainer = styled.div`
  background: #e6faec;
  border-radius: 50%;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

export const Body = styled.div`
  background: #ffffff;
  border-radius: 0 0 1rem 1rem;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${smallFontSize};

  label {
    height: 3rem;
    width: 19.75rem;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.5rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;

    ${media.smallScreen`
      height: 2.4rem;
      width: 14rem;
      font-size: 1rem;
      line-height: 1.2rem;
    `}
  }
`;

export const ItemImage = styled.div`
  margin-right: 0.5rem;

  img {
    max-width: 4rem;
  }
`;
