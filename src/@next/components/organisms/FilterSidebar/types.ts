import { IFilterAttributes, IFilters } from '@types';
export interface IProps {
  attributes: IFilterAttributes[];
  applyFilters: () => void;
  filters: IFilters;
  hasFilterChanged: boolean;
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  show: boolean;
  target?: HTMLElement | null;
}
