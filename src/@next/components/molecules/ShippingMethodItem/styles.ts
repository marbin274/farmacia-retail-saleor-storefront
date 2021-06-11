import { media, styled } from "@styles";
import { white } from "@temp/@next/globalStyles/constants";

const shippingTextOpacity = "0.7"

export const ShippingMethodItem = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const ShippingMethodItemControl = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  bottom: -1rem;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  left: 0;
  box-shadow: 1px 1px 9px 2px #ddd;
  &:hover {
    box-shadow: 0px 0px 6px 2px #ccc;
  }
  & > div {
    width: 100%;
  }
  height: 7.5rem;
  ${media.largeScreen`
  height: 12.5rem;
    flex-direction: column;
  `}
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

export const ShippingMethodScheduleControl = styled.div`
  padding: 1rem 1rem 0rem;
  flex: 1;
`
export const ShippingMethodDate = styled.div``
export const ShippingMethodTime = styled.div``

export const ShippingMethodControl = styled.div`
  color: ${({ theme }) => theme.colors.aunaBlack};
  font-size: ${({ theme }) => theme.typography.smallFontSize};  
  > div {
    padding-top: 0px;
    margin: 0px;
  }
  .control{
    background-color: ${white};
  }
`
