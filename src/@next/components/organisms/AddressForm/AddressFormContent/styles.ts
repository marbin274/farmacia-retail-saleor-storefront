import { styled } from "@styles";

export const MapWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

export const Map = styled.div`
  width: 100%;
  height: 21.25rem;
`;

export const MapHint = styled.div`
  background-color: ${({theme})=>theme.colors.complementary1};
  font-size: ${({theme})=>theme.typography.smallFontSize};
  font-weight: ${({theme})=>theme.typography.boldFontWeight};
  height: 3rem;
  padding: 1rem;
`;
