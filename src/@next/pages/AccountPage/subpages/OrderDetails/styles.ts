import { ContainerStyle, mediaUp, styled } from '@styles';

export const Wraper = styled.div`
  ${ContainerStyle}
`;

export const OrderInformation = styled.div`
  grid-template-columns: 1fr;
  ${mediaUp.mediumScreen`
        grid-template-columns: 1fr 1fr 1fr 5rem;
    `};
`;
