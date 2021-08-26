export const DEFAULT_PROPS = {
  applyFilters: () => void 0,
  attributes: [
    {
      filterableInStorefront: false,
      id: '1',
      name: 'Size',
      slug: 'size',
      values: [
        {
          id: '2',
          name: '41',
          slug: '41',
        },
        {
          id: '3',
          name: '42',
          slug: '42',
        },
        {
          id: '4',
          name: '43',
          slug: '43',
        },
        {
          id: '5',
          name: '44',
          slug: '44',
        },
        {
          id: '6',
          name: '45',
          slug: '45',
        },
        {
          id: '7',
          name: '46',
          slug: '46',
        },
      ],
    },
  ],
  filters: {
    attributes: {
      size: ['41'],
    },
    pageSize: 5,
    priceGte: 0,
    priceLte: 0,
    sortBy: '',
  },
  hasFilterChanged: false,
  hide: () => void 0,
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void 0,
  show: true,
};
