import { DefaultTheme, styled } from '@styles';

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export const Tile = styled.label<{ checked: boolean }>`
  display: block;
  background-color: ${(props) =>
    props.checked
      ? props.theme.colors.complementary1
      : props.theme.colors.white};
  border: 2px solid
    ${(props) =>
      props.checked
        ? props.theme.input.borderColorActive
        : props.theme.input.borderColor};
  cursor: pointer;
  border-radius: 1rem;
  width: 100%;
`;

export const PaymentLine = styled.span`
  display: inline-flex;
  flex: justify-content;
  position: relative;
  width: calc(100% - 3em);
`;

export const PaymentTitle = styled.div<{ checked: boolean }>`
  color: ${(props) =>
    props.checked
      ? props.theme.input.borderColorActive
      : props.theme.input.labelColor};
  width: 100%;
  height: inherit;
  line-height: 2.4em;
`;

export const PaymentIcon = styled.div<{ checked: boolean }>`
  color: ${(props) =>
    props.checked ? props.theme.input.textColor : props.theme.input.labelColor};
  margin-left: 5px;
`;

export const PaymentIconNiubiz = styled.div`
  margin-left: 5px;
  padding-top: 0.9375rem;
  padding-right: 0.625rem;
`;

export const getIconColor = (checked: boolean, theme: DefaultTheme): string =>
  checked ? theme.input.borderColorActive : theme.input.labelColor;

export const RadioContainerPayment = styled.div`
  > div {
    > div {
      margin-bottom: 0.7em;
    }
  }
`;

export const PaymentSubtitle = styled.span`
  font-size: ${(props) => props.theme.typography.baseFontFamily};
  display: block;
  font-weight: 600;
  margin-bottom: 0.625rem;
`;
