import { styled } from '@styles';
import { Button } from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';

export const AddRemoveButton = styled(Button)`
  align-items: center;
  background-color: ${farmatheme.theme.colors.brand['01']};
  border-radius: 6.25rem;
  color: ${farmatheme.theme.colors.white}!important;
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  padding: 0.5rem;
  width: 1.5rem;

  &:nth-child(1) {
    justify-content: flex-start;
    margin-left: 1rem;
  }
  &:nth-child(3) {
    justify-content: flex-end;
    margin-right: 1rem;
  }
  span {
    font-size: 0.8rem;
    font-weight: 500;
    margin-left: 0 !important;
    width: 100%;
  }
  &:hover {
    background-color: ${farmatheme.theme.colors.brand['01']};
    color: ${farmatheme.theme.colors.white}!important;
  }

  &:disabled {
    background-color: $auna-complementary1;
    cursor: not-allowed !important;
    color: ${farmatheme.theme.colors.gray['02']}!important;
  }

  &:active {
    box-shadow: none;
  }

  &:focus {
    background-color: ${farmatheme.theme.colors.brand['01']};
    box-shadow: none;
  }
`;
