import React from 'react';

import { Checkbox } from '@components/atoms';

import * as S from './styles';
import { IProps } from './types';
import { Button, PlusIcon } from '@farmacia-retail/farmauna-components';

export const AttributeValuesChecklist: React.FC<IProps> = ({
  title,
  name,
  values,
  valuesShowLimit = false,
  valuesShowLimitNumber = 5,
  onValueClick,
}: IProps) => {
  const [viewAllOptions, setViewAllOptions] = React.useState(!valuesShowLimit);

  return (
    <S.Wrapper>
      {title && <S.Header>{title}</S.Header>}
      {values &&
        values.map((value, index) => {
          return !viewAllOptions && index > valuesShowLimitNumber - 1 ? null : (
            <Checkbox
              key={index}
              name={name}
              checked={!!value.selected}
              onChange={() => onValueClick(value)}
            >
              {value && value.name}
            </Checkbox>
          );
        })}
      {!viewAllOptions && values.length > valuesShowLimitNumber && (
        <S.ViewMoreButton>
          <Button
            onClick={() => setViewAllOptions(true)}
            variant="outline"
            icon={<PlusIcon size={15} />}
          >
            ver todo
          </Button>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
