import { styled } from '@styles';
import { Button } from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';
import { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 0rem 1rem;
  width: 100%;
`;

export const CategoryButton = styled(Button)`
  > span {
    display: flex;
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    > span {
      margin-left: 0.5rem;
    }
  }
`;

export const List = styled.ul`
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-style: normal;
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  line-height: ${(props) => props.theme.typography.baseLineHeight};
  margin: 0;
`;

const buttonActive = css`
  border-color: ${farmatheme.theme.colors.primary.light};
  > span {
    color: ${farmatheme.theme.colors.primary.light};
  }
`;

export const ListItem = styled.li`
  padding: 0rem 1rem;
  text-align: center;

  .navlink-active {
    button {
      ${buttonActive}
    }
  }

  a,
  button > span {
    text-transform: capitalize;
  }
  button {
    &: hover {
      ${buttonActive}
    }
    > span {
      color: ${farmatheme.theme.colors.primary.medium};
    }
  }
`;
