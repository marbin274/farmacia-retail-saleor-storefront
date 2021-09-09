import {
  CategoryDetails_category,
  CategoryDetails_category_ancestors_edges_node,
} from '@sdk/queries/gqlTypes/CategoryDetails';
import { generateCategoryUrl } from '@temp/core/utils';

export const buildCategory = (
  category: CategoryDetails_category_ancestors_edges_node,
  index: number
) => ({
  '@type': 'ListItem',
  position: index,
  name: category.name,
  item: `${window?.location?.protocol}//${
    window?.location?.hostname
  }${generateCategoryUrl(category.id, category.name)}`,
});

export const structuredCategory = (category: CategoryDetails_category) => {
  const itemList = (category.ancestors?.edges || []).map(
    (
      ancestor: { node: CategoryDetails_category_ancestors_edges_node },
      index: number
    ) => buildCategory(ancestor.node, index + 1)
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      ...itemList,
      buildCategory(category, itemList.length + 1),
    ],
  };
};

export const structuredData = (category) => {
  return JSON.stringify(structuredCategory(category));
};
