import { media, styled } from "@styles";
import { aunaBrand5, white } from "@styles/constants";

export const OutStockLabel = styled.p`
position: absolute;
top: -19px;
left: -53px;
transform: rotate(-43.6deg);
background: ${aunaBrand5};
color: ${white};
width: 166px;
height: 86px;
display: flex;
justify-content: center;
align-items: flex-end;
padding: 12px;
font-size: 16px;
z-index: 2;

${media.largeScreen`
  top: -25px;
  left: -62px;
`}
`;