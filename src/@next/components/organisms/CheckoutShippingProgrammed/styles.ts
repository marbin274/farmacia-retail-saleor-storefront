import { media, styled } from "@styles";
import { white } from "@temp/@next/globalStyles/constants";

export const ShippingMethodItemControl = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  margin-top: 1rem;
  box-shadow: 1px 1px 9px 2px #ddd;
  &:hover {
    box-shadow: 0px 0px 6px 2px #ccc;
  }
  & > div {
    width: 100%;
  }
  height: 7.5rem;
  margin-top: 1rem;
  ${media.largeScreen`
    margin-top: 0;
    height: auto;
    padding: 1rem 0;
    flex-direction: column;
  `}
`;

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
export const ShippingMethodScheduleControl = styled.div`
  padding: 0 1rem 0rem;
  flex: 1;
  ${media.largeScreen`
    &:last-child {
        padding: 1rem 1rem 0rem;
    }
  `}
`