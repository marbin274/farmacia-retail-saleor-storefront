interface SortOptions {
  value?: string;
  label: string;
}

interface ActiveFiltersAttribute {
  attributeSlug: string;
  valueSlug: string;
  valueName: string;
}

export interface IProps {
  activeSecondaryOptions?: string[];
  activeFilters: number;
  activeFiltersAttributes: ActiveFiltersAttribute[];
  activeSortOption?: string;
  clearFilters: () => void;
  hideFilters?: boolean;
  numberOfProducts: number;
  onChangeSecondaryOption?: (value: { value?: string; label: string }) => void;
  onChangeSortOption: (order: { value?: string; label: string }) => void;
  onCloseFilterAttribute: (attributeSlug: string, valueSlug: string) => void;
  openFiltersMenu: () => void;
  secondaryClearLabel?: string;
  secondaryLabel?: string;
  secondaryOptions?: SortOptions[];
  showSecondarySelect?: boolean;
  sortOptions: SortOptions[];
}
