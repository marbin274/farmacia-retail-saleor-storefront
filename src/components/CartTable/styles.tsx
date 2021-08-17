import { mediaUp, styled } from '@styles';
import { Thumbnail } from '@components/molecules';

export const Table = styled.table`
  tr,
  thead,
  tbody,
  tfoot {
    width: 100%;
  }
  th,
  td {
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

export const ThumbnailTable = styled(Thumbnail)`
  width: 3.125rem;
  height: auto;
`;
