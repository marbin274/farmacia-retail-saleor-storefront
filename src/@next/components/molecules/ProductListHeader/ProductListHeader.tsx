import { Chip, DropdownSelect } from "@components/atoms";
import { FilterIcon } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
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
        {!hideFilters && (
          <S.LeftSide>
            <S.FiltersButton
              onClick={openFiltersMenu}
              data-cy="filters__button"
            >
              <S.Filters>
                <FilterIcon
                  size={18}
                  color={farmatheme.theme.colors.interactive}
                />
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
          </S.LeftSide>
        )}

        <S.RightSide>
          <S.Element
            className="products_found"
            data-cy="no-of-products-found_label"
          >
            <S.Label>Productos encontrados : </S.Label>
            <S.NumberProducts> {numberOfProducts} </S.NumberProducts>
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
      <S.FiltersChipsWrapper
        hasFilters={
          !!activeFiltersAttributes && activeFiltersAttributes.length > 0
        }
      >
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
