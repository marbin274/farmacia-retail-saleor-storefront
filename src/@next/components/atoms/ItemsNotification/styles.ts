import { media, styled } from "@styles";
import {
  aunaComplementary4,
  aunaGrey60,
  smallFontSize,
  turquoise,
  white,
  smallFontWeight,
} from "@styles/constants";

export const NotificationContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 5rem;
  margin: 0 auto;
  .container {
    margin-top: 0;
    justify-content: flex-end;
    display: flex;

    ${media.smallScreen`
      width: 90%;
      padding: 0;
  `}
  }
`;

export const ItemNotification = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  right: 0;
  min-width: 350px;
  max-width: 20%;
  border-radius: 16px;
  color: black;
  border: solid 1px ${aunaGrey60};

  ${media.smallScreen`
    width: 100%;
    max-width: 100%;
    min-width: 0px;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 16px 16px 0 0;
  background: ${aunaComplementary4};
  font-size: ${smallFontSize};

  p {
    font-weight: ${smallFontWeight};
  }

  button {
    padding: 0;
    background: transparent;

    svg {
      path {
        fill: ${turquoise};
      }
    }
    &:hover {
      background: transparent;
    }

    &:active {
      box-shadow: none;
      background-color: transparent !important;
    }

    ${media.smallScreen`
      padding: 0;
      width: 10%;
  `}
  }
`;

export const Body = styled.div`
  padding: 1rem;
  background: ${white};
  border-radius: 0 0 16px 16px;
`;

export const Item = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${smallFontSize};

  .check {
    padding-top: 0.3rem;
    margin-right: 0.5rem;
  }

  label {
    &:last-child {
      font-weight: ${smallFontWeight};
    }
  }

  &:last-child {
    margin-bottom: 0rem;
  }
`;
