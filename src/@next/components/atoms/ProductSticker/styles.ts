import { media, styled } from "@styles";
import { white } from "@styles/constants";

export const ProductSticker = styled.p<{
  backgroundColor: string;
}>`
position: absolute;
top: -19px;
left: -53px;
transform: rotate(-43.6deg);
${({ backgroundColor }) => `background: ${backgroundColor}`}
color: ${white};
width: 166px;
height: 86px;
display: flex;
justify-content: center;
align-items: flex-end;
padding: 12px;
font-size: 16px;

${media.largeScreen`
  top: -25px;
  left: -62px;
`}
`;
