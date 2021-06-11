import { Chip, DropdownSelect, Icon } from "@components/atoms";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { FilterIcon } from "@farmacia-retail/farmauna-components";



export const ProductListHeaderCategory: React.FC<IProps> = ({
  hideFilters = false,
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
      <S.Bar>
        {!hideFilters &&
          <S.LeftSide>
            <S.FiltersButton onClick={openFiltersMenu} data-cy="filters__button">
              <S.Filters>
                <FilterIcon size={18} color={'#452FBA'} />
                <span>
                  Filtrar
              {activeFilters > 0 && (
                    <>
                      <span> ({activeFilters})</span>
                    </>
                  )}
                </span>
              </S.Filters>
            </S.FiltersButton>
            {activeFilters > 0 && (
              <S.Clear onClick={clearFilters}>
                <Icon name="trash" size={18} />
                <span>Borrar filtros</span>
              </S.Clear>
            )}
          </S.LeftSide>
        }

        <S.RightSide>
          <S.Element
            className="products_found"
            data-cy="no-of-products-found_label"
          >
            <S.Label>Productos encontrados :  </S.Label>
            <S.NumberProducts> { numberOfProducts } </S.NumberProducts>
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
          ({ attributeSlug, valueName, valueSlug }, index) => (
            <Chip
              key={index}
              onClose={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
            >
              {valueName}
            </Chip>
          )
        )}
      </S.FiltersChipsWrapper>
    </S.Wrapper>
  );
};
