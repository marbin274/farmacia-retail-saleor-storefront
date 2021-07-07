import { DropdownSelect } from "@components/atoms";
import {
  Chip,
  FilterIcon,
  TrashIcon,
  XIcon,
} from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";
import { aunaGrey100 } from "@temp/@next/globalStyles/constants";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
  activeFilters = 0,
  activeFiltersAttributes = [],
  activeSortOption,
  clearFilters,
  hideFilters = false,
  numberOfProducts = 0,
  onChange,
  onCloseFilterAttribute,
  openFiltersMenu,
  sortOptions,
}: IProps) => {
  return (
    <>
    <S.Wrapper role="product-list-header">
      <S.Bar>
        {!hideFilters && (
          <S.LeftSide>
            <S.FiltersButton
              onClick={openFiltersMenu}
              data-cy="filters__button"
              role="filters__button"
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
            <S.NumberProducts role="no-of-products-found_value">
              {numberOfProducts}
            </S.NumberProducts>
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
        {activeFilters > 0 &&
          !!activeFiltersAttributes &&
          activeFiltersAttributes.length > 0 && (
            <Chip
              bgColor={farmatheme.theme.colors.highlight.lightest}
              label={
                <span className="fa-flex fa-items-center" role="clear-filters">
                  <TrashIcon
                    className="fa-mr-2 fa-transform fa-scale-125"
                    onClick={clearFilters}
                    size={12}
                    data-testid="clear-filters_icon"
                  />
                  <span className="fa-font-semibold">Borrar filtros</span>
                </span>
              }
              size="medium"
              textColor={farmatheme.theme.colors.highlight.medium}
            />
          )}
        {activeFiltersAttributes.map(
          ({ attributeSlug, valueName, valueSlug }, index) => (
            <Chip
              bgColor={farmatheme.theme.colors.highlight.lightest}
              key={index}
              label={
                <span className="fa-flex fa-items-center">
                  <span className="fa-mr-2 fa-font-semibold">{valueName}</span>
                  <XIcon
                    onClick={() =>
                      onCloseFilterAttribute(attributeSlug, valueSlug)
                    }
                    size={12}
                  />
                </span>
              }
              size="medium"
              textColor={farmatheme.theme.colors.highlight.medium}
            />
          )
        )}
      </S.FiltersChipsWrapper>
    </S.Wrapper>
      <S.MobileLabel className="fa-my-2">
        <span
          className="fa-text-sm fa-font-normal fa-tracking-tight fa-mr-2"
          style={{ color: aunaGrey100 }}
        >
          Productos encontrados
        </span>
        <span className="fa-text-sm fa-font-medium fa-tracking-tight fa-text-neutral-darkest">
          {numberOfProducts}
        </span>
      </S.MobileLabel>
      
    </>
  );
};
