import { media, styled } from "@styles";
import {aunaBrand3, white} from "@styles/constants";


export const ShippingMethodForm = styled.form`
  display: grid;
  grid-gap: 20px;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const Tile = styled.label<{ checked: boolean }>`
  background-color: ${props => props.checked ? props.theme.colors.complementary1 : props.theme.colors.white};
  border: 2px solid  ${props => props.checked ? props.theme.input.borderColorActive : props.theme.input.borderColor};
  border-radius: 1rem;
  display: block;
  font-size: ${props => props.theme.typography.smallFontSize};
  cursor: pointer;
  padding: 20px;
`;

export const RadioContent = styled.span`
  display: inline-flex;
  flex: justify-content;
  width: calc(100% - 3em);
`;

export const RadioName = styled.span<{ checked: boolean }>`
  color: ${props => props.checked ? props.theme.input.borderColorActive : props.theme.input.labelColor};
  width: 100%;
`;

export const Price = styled.span<{ checked: boolean }>`
  color: ${props => props.checked ? props.theme.input.textColor : props.theme.input.labelColor};
  width: 3rem;
`;

export const FieldsGroup = styled.div`
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 100%;
`;

export const GroupLabel = styled.div`
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const GroupLabelIndex = styled.span`
    display: inline-block;
    color: ${white};
    background-color: ${aunaBrand3};
    border-radius: 5rem;
    height: 1.9rem;
    padding: 0.4rem;
    text-align: center;
    width: 1.9rem;
`;

export const GroupLabelTitle = styled.span`
    font-weight: bolder;
    padding-left: 1rem;
`;

export const ShippingMethodContainer = styled.div<{ isScheduledSelected?: boolean, selected: boolean, hasError: boolean }>`
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    border: 1px solid ${({ hasError, selected, theme }) => hasError ? `${theme.colors.aunaError}` : (!!selected ? `${(theme.colors.interactive)}` : theme.colors.backgroundLight)};
    flex-direction: row;
    cursor: pointer;
    display: flex;
    margin: 1rem 0rem;
    height: 7.8125rem;
    box-shadow: 1px 1px 9px 2px #ddd;
    transition: box-shadow 0.2s ease-in-out;
    margin-bottom: ${(props: any) => props.isScheduledSelected ? '8rem' : '0'};
    ${media.largeScreen`
    margin-bottom: ${(props: any) => props.isScheduledSelected ? '12.5rem' : '0'};
    `}
    &:hover {
      box-shadow: 0px 0px 6px 2px #ccc;
    }
`

export const ShippingMethodItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

