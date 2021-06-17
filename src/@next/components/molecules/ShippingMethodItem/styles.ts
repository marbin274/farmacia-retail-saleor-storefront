import { styled } from "@styles";

const shippingTextOpacity = "0.7"

export const ShippingMethodItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ShippingMethodText = styled.div`
  width: 100%;
`
export const ShippingMethodTitle = styled.p<{ selected: boolean }>`
  color: ${({ theme }) => theme.colors.shippingMethodBlack};
  font-size: ${({ theme }) => theme.typography.baseFontSizeSmall};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  opacity: ${({selected}) => !!selected ? "initial": shippingTextOpacity};
  margin-bottom: 0.5rem;
`
export const ShippingMethodSubTitle = styled.p<{ selected: boolean }>`
  color: ${({ theme }) => theme.colors.shippingMethodBlack};
  font-size: ${({ theme }) => theme.typography.baseFontSizeSmall};
  font-weight: normal;
  opacity: ${({selected}) => !!selected ? "initial": shippingTextOpacity};
  margin-bottom: 0.5rem;
`

export const ShippingMethodPrice = styled.div<{ selected: boolean }>`    
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 20%;
   span {
    color: ${({ theme }) => theme.colors.shippingMethodBlack};
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    opacity: ${({selected}) => !!selected ? "initial": shippingTextOpacity};
  }
`

export const ShippingMethodDate = styled.div``
export const ShippingMethodTime = styled.div``


