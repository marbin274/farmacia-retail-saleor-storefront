import { AttributeValuesChecklist } from '@components/molecules';
import { Button, XIcon } from '@farmacia-retail/farmauna-components';
import { useClickedOutside } from '@hooks';
import React from 'react';
import { Overlay } from '../';
import { IFilters, ISingleFilterAttribute } from '../../../types';
import * as S from './styles';
import { IProps } from './types';

const checkIfAttributeIsChecked = (
  filters: IFilters,
  value: ISingleFilterAttribute,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    return !!filters.attributes[slug].find((filter) => filter === value.slug);
  }
  return false;
};

export const FilterSidebar: React.FC<IProps> = React.memo(
  ({
    applyFilters,
    attributes,
    filters,
    hasFilterChanged,
    hide,
    onAttributeFiltersChange,
    show,
    target,
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
        <S.Wrapper
          className="fa-bg-neutral-light fa-h-full fa-w-80 fa-flex fa-flex-col"
          ref={setElementRef()}
          data-cy="filter-sidebar"
        >
          <S.SubWrapper>
            <div className="fa-flex fa-items-center fa-text-2xl fa-font-semibold fa-justify-between fa-p-0 fa-w-full fa-mb-8">
              <span>Filtrar</span>
              <Button
                onClick={hide}
                size="small"
                className="fa-bg-interactive hover:fa-bg-highlight-dark fa-relative"
                icon={
                  <S.WrapperIconButton>
                    <XIcon size={14} />
                  </S.WrapperIconButton>
                }
                iconOnly
              />
            </div>
          </S.SubWrapper>
          <S.SubWrapper>
            <div className="fa-text-neutral-darkest fa-text-base fa-font-semibold fa-mb-6">
              Filtrar por marca
            </div>
            <S.Body>
              {attributes
                .filter((it) => it.filterableInStorefront)
                .map(({ id, name, slug, values }) => {
                  return (
                    <AttributeValuesChecklist
                      key={id}
                      title={name}
                      name={slug}
                      values={values.map((value) => ({
                        ...value,
                        selected: checkIfAttributeIsChecked(
                          filters,
                          value,
                          slug
                        ),
                      }))}
                      valuesShowLimit={false}
                      onValueClick={(value) =>
                        onAttributeFiltersChange(slug, value.slug)
                      }
                    />
                  );
                })}
            </S.Body>
          </S.SubWrapper>
          <S.Footer className="fa-bg-white fa-flex fa-items-center fa-justify-center fa-flex-grow">
            <S.SubWrapper>
              <Button
                disabled={!hasFilterChanged}
                onClick={applyFilters}
                fullWidth
              >
                Aplicar Filtros
              </Button>
            </S.SubWrapper>
          </S.Footer>
        </S.Wrapper>
      </Overlay>
    );
  }
);
