import { media, styled } from "@styles";

const shippingTextOpacity = "0.7"

export const ShippingMethodItem = styled.div`
  display: flex;
`;
export const ShippingMethodItemControl = styled.div`
  display: flex;
  ${media.largeScreen`
    flex-direction: column;
  `}
`;

export const ShippingMethodText = styled.div`
  width: 80%;
`
export const ShippingMethodTitle = styled.p<{ selected: boolean }>`
  color: ${({ theme }) => theme.colors.shippingMethodBlack};
  font-size: ${({ theme }) => theme.typography.baseFontSize};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  opacity: ${({selected}) => !!selected ? "initial": shippingTextOpacity};
`
export const ShippingMethodSubTitle = styled.p<{ selected: boolean }>`
  color: ${({ theme }) => theme.colors.shippingMethodBlack};
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: normal;
  opacity: ${({selected}) => !!selected ? "initial": shippingTextOpacity};
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

export const ShippingMethodScheduleControl = styled.div`
  padding: 1rem 1rem 0rem;
  flex: 1;
`
export const ShippingMethodDate = styled.div``
export const ShippingMethodTime = styled.div``
export const ShippingMethodLabel = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
`
export const ShippingMethodControl = styled.div`
  color: ${({ theme }) => theme.colors.aunaBlack};
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  > div {
    padding-top: 0px;
    margin: 0px;
  }
`
