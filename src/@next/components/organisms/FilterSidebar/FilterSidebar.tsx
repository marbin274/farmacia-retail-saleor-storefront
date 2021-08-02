import { IconButton } from "@components/atoms";
import { AttributeValuesChecklist } from "@components/molecules";
import { Button } from "@farmacia-retail/farmauna-components";
import { useClickedOutside } from "@hooks";
import React from "react";
import { Overlay } from "../";
import { IFilters, ISingleFilterAttribute } from "../../../types";
import * as S from "./styles";
import { IProps } from "./types";

const checkIfAttributeIsChecked = (
  filters: IFilters,
  value: ISingleFilterAttribute,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find(filter => filter === value.slug)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const FilterSidebar: React.FC<IProps> = ({
  hide,
  filters,
  show,
  attributes,
  target,
  onAttributeFiltersChange,
}: IProps) => {
  const { clickedOutside, setElementRef } = useClickedOutside();
  React.useEffect(() => {
    hide();
  }, [clickedOutside]);
  return (
    <Overlay
      duration={0}
      position="left"
      show={show}
      hide={hide}
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()} data-cy="filter-sidebar">
        <div>
          <S.Header>
            <span>Filtros</span>
            <IconButton onClick={hide} name="x" size={18} />
          </S.Header>
        </div>
        <S.SubWrapper>
          <S.Body>
            {attributes
              .filter(it => it.filterableInStorefront)
              .map(({ id, name, slug, values }) => {
                return (
                  <AttributeValuesChecklist
                    key={id}
                    title={name}
                    name={slug}
                    values={values.map(value => ({
                      ...value,
                      selected: checkIfAttributeIsChecked(filters, value, slug),
                    }))}
                    valuesShowLimit
                    onValueClick={value =>
                      onAttributeFiltersChange(slug, value.slug)
                    }
                  />
                );
              })}
          </S.Body>
          <S.Footer>
            <Button onClick={hide}>Aplicar</Button>
          </S.Footer>
        </S.SubWrapper>
      </S.Wrapper>
    </Overlay>
  );
};
