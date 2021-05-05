import React from "react";

import { ButtonLink, Checkbox, Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

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
          if (!viewAllOptions && index > valuesShowLimitNumber - 1) {
            return null;
          } else {
            return (
              <Checkbox
                key={index}
                name={name}
                checked={!!value.selected}
                onChange={() => onValueClick(value)}
              >
                {value && value.name}
              </Checkbox>
            );
          }
        })}
      {!viewAllOptions && values.length > valuesShowLimitNumber && (
        <S.ViewMoreButton>
          <ButtonLink
            size="sm"
            color="secondary"
            onClick={() => setViewAllOptions(true)}
          >
            <Icon name="plus" size={12} />
            <span>Ver todo</span>
          </ButtonLink>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
