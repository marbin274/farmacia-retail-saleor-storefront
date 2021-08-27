import { Button } from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';
import { media, mediaUp, styled } from '@styles';
import { aunaDiscount } from '@temp/@next/globalStyles/constants';
import { Overlay } from '@components/organisms/OverlayComponent';
import { Link } from 'react-router-dom';

export const OverlayWrapper = styled(Overlay)`
  .overlay__right {
    overflow-y: hidden;

    ${mediaUp.smallScreen`
      border-top-left-radius: 1.5rem;
      border-bottom-left-radius: 1.5rem;
    `}
  }
`;

export const CartBody = styled.div`
  height: calc(100% - 6rem);
  min-height: calc(100% - 6rem);

  ${mediaUp.smallScreen`
    position: relative;
  `}
`;

export const CartEmpty = styled.div`
  height: calc(100% - 9.5rem);
`;

export const List = styled.ul<{ morePadding: boolean }>`
  height: calc(100% - 6.75rem);
  padding: 1rem 1.5rem ${({ morePadding }) => (morePadding ? '20rem' : '')};
  overflow: auto;

  ${media.smallScreen`
    background-color: ${farmatheme.theme.colors.neutral.light};
    height: auto;
    min-height: calc(100% - 6rem);
    padding: 0 0 ${({ morePadding }) => (morePadding ? '20rem' : '8rem')};
  `}
`;

export const ListItem = styled.li`
  width: 100%;
  min-height: 8rem;

  ${mediaUp.smallScreen`
    width: 23rem;
  `}

  &:hover {
    box-shadow: none;

    ${mediaUp.smallScreen`
      box-shadow: 0 0.5rem 1rem rgba(42, 55, 81, 0.08);
      transition: 0.3s;
    `}
  }
`;

export const ListItemLinkImage = styled(Link)`
  img {
    height: 4rem;
    margin: auto;
    object-fit: contain;
    border-radius: 0.5rem;

    ${media.smallScreen`
      height: 4.5rem;
      border-radius: none;
    `}
  }
`;

export const ListItemDetails = styled.div`
  width: calc(100% - 5.5rem);
`;

export const ListItemName = styled.p`
  min-height: 3rem;
`;
export const ListItemDown = styled.div`
  .itemHandler {
    min-width: 8.125rem;
    min-height: 2.5rem;

    ${media.smallScreen`
      max-width: calc(100% - 6.375rem);
    `}

    &--actions {
      ${media.xSmallScreen`
        width: 7rem;
      `}
    }
  }

  > div {
    &:nth-child(1),
    &:nth-child(3) {
      margin-top: 0.5rem;
    }
  }
  > span {
    align-self: center;
  }
`;

export const ListItemPriceWrapper = styled.div`
  .price {
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-weight: 600;

    ${mediaUp.smallScreen`
      font-size: 1rem;
      `}
  }
  .discounted_price {
    color: ${aunaDiscount} !important;
  }
`;

export const ButtonTrash = styled(Button)`
  width: 2rem !important;
  height: 2rem !important;
  color: black;
  background-color: #f7f6f8;
  &:hover {
    background-color: #fbe9ea;
    color: #c82328;
  }
`;

export const ListItemDeleteOptions = styled.div`
  > button {
    margin: 0 0.25rem;
    outline: none;
    > span {
      margin: 0;
    }
  }
`;
