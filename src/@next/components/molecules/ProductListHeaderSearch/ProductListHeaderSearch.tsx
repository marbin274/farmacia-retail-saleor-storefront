import { Chip, DropdownSelect, Icon } from "@components/atoms";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { FilterIcon } from "@farmacia-retail/farmauna-components";
import { StringParam, useQueryParam } from "use-query-params";
import farmatheme from "@farmatheme";
import { largeScreen } from "@temp/@next/globalStyles/constants";
import { useMediaScreen } from "@temp/@next/globalStyles";

export const ProductListHeaderSearch: React.FC<IProps> = ({
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
  const { isCustomMinScreen: isDesktop } = useMediaScreen(
    largeScreen.toString()
  );
  const [search] = useQueryParam("q", StringParam);

  const renderProductsFound = () => {
    return (
      <S.Element
        className="products_found"
        data-cy="no-of-products-found_label"
      >
        <S.NumberProducts>{numberOfProducts} </S.NumberProducts>
        <S.Label>Productos encontrados con: </S.Label>
        <S.Label>
          "<S.SearchText>{search}</S.SearchText>"
        </S.Label>
      </S.Element>
    );
  };
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
            {activeFilters > 0 && (
              <S.Clear onClick={clearFilters}>
                <Icon name="trash" size={18} />
                <span>Borrar filtros</span>
              </S.Clear>
            )}
          </S.LeftSide>
        )}

        <S.RightSide className="product_list_header__right_side">
          {isDesktop && renderProductsFound()}
          <S.Element className="product_list_header__dropdown">
            <S.Sort>
              <DropdownSelect
                clearText="Limpiar"
                label="Ordenar por"
                onChange={onChange}
                options={sortOptions}
                value={sortOptions.find(
                  option => option.value === activeSortOption
                )}
              />
            </S.Sort>
          </S.Element>
          {!isDesktop && renderProductsFound()}
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
