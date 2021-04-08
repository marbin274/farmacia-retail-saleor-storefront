import { Tile as TileAtom } from "@components/atoms";
import { styled } from "@styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem;

  button {
    padding: 0.75rem 1.75rem;
  }
`;

export const Tile = styled(TileAtom)`
  padding-bottom: 1rem;
`;
