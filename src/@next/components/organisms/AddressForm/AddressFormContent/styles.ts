import { styled } from "@styles";
import { aunaComplementary1 } from "@styles/constants";

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
  height: 3rem;
  font-size: 0.75rem;
  background-color: ${aunaComplementary1};
  padding: 1rem;
`;
