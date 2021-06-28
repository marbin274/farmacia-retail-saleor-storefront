import { SortOptions } from "@temp/views/Search/Page";

export const SORT_OPTIONS: SortOptions = [
    {
      label: "Limpiar...",
      value: null,
    },
    {
      label: "Precio (↑)",
      value: "price",
    },
    {
      label: "Precio (↓)",
      value: "-price",
    },
    {
      label: "Nombre (A-Z)",
      value: "name",
    },
    {
      label: "Nombre (Z-A)",
      value: "-name",
    },
    // TODO: uncomment as soon as we need to extend the cagetory filters
    // {
    //   label: "Last updated Ascending",
    //   value: "updated_at",
    // },
    // {
    //   label: "Last updated Descending",
    //   value: "-updated_at",
    // },
  ];
