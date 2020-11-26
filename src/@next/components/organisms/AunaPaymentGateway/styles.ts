import { styled } from "@styles";
import { aunaGrey60, aunaGrey100 } from "@styles/constants";
import niubizLogo from "images/auna/niubiz-logo.svg";

export const Wrapper = styled.div`
  align: center;
  margin-top: 1rem;
  padding: 1rem 0;
`;

export const PoweredBy = styled.div`
  color: ${aunaGrey100};
  border-bottom: solid ${aunaGrey60} 1px;
  display: flex;
  font-size: .7rem;
  margin-left: 2rem;
  margin-top: 2rem;
  padding: .5rem 0;
  width:100%; 
  
  span {
    padding-right: 1.3rem;
  }
`;

export const paymentGatewayLogo = niubizLogo;