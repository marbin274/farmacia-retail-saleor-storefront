import React from "react";

import { Chip, DropdownSelect } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Wrapper className="container">
        <S.Bar>
          <S.LeftSide>
            <S.FiltersButton
              onClick={openFiltersMenu}
              data-cy="filters__button"
            >
              <S.Filters>
                Filtros{" "}
                {activeFilters > 0 && (
                  <>
                    <span>({activeFilters})</span>
                  </>
                )}
              </S.Filters>
            </S.FiltersButton>
            {activeFilters > 0 && (
              <S.Clear onClick={clearFilters}>Limpiar filtros</S.Clear>
            )}
          </S.LeftSide>

          <S.RightSide>
            <S.Element data-cy="no-of-products-found_label">
              <S.Label>Productos encontrados: </S.Label>
              {numberOfProducts}
            </S.Element>
            <S.Element>
              <S.Sort>
                <DropdownSelect
                  onChange={onChange}
                  options={sortOptions}
                  value={sortOptions.find(
                    option => option.value === activeSortOption
                  )}
                />
              </S.Sort>
            </S.Element>
          </S.RightSide>
        </S.Bar>
        <S.FiltersChipsWrapper>
          {activeFiltersAttributes.map(
            ({ attributeSlug, valueName, valueSlug }) => (
              <Chip
                onClose={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
              >
                {valueName}
              </Chip>
            )
          )}
        </S.FiltersChipsWrapper>
      </S.Wrapper>
    </S.Wrapper>
  );
};
