import { styled, mediaUp } from "@styles";

export const Table = styled.table`
  tr, thead, tbody, tfoot {
    width: 100%;
  }
  th, td {
    width: 25%;
  }
  ${mediaUp.largeScreen`
    tr, thead, tbody, tfoot {
      width: auto;
    }
    th, td {
      width: auto;
    }
  `}
`;
