import { queryFactory, queryWithVariablesFactory } from './useQuery';

export const useArticle = queryWithVariablesFactory('getArticle');
export const useAtrributes = queryWithVariablesFactory('getAttributes');

export const useCategories = queryFactory('getCategoryList');
export const useCategoryDetails =
  queryWithVariablesFactory('getCategoryDetails');
export const useCategoryProducts = queryWithVariablesFactory(
  'getCategoryProducts'
);

export const useCollectionProducts = queryWithVariablesFactory(
  'getCollectionProducts'
);
export const useCollectionCategories = queryWithVariablesFactory(
  'getCollectionCategories'
);

export const useFeaturedProducts = queryWithVariablesFactory(
  'getFeaturedProducts'
);
export const useFooterSecondayMenu = queryFactory('getFooterSecondaryMenu');

export const useHomePage = queryFactory('getHomePage');

export const useLanding = queryWithVariablesFactory('getLanding');

export const useMainBanner = queryFactory('getMainBanner');
export const useMainMenu = queryFactory('getMainMenu');

export const useOrderDetails = queryWithVariablesFactory('getOrderDetails');
export const useOrdersByUser = queryWithVariablesFactory('getOrdersByUser');

export const useProductDetails = queryWithVariablesFactory('getProductDetails');
export const useProductList = queryWithVariablesFactory('getProductList');

export const useSearchProducts = queryWithVariablesFactory('searchProducts');

export const useSelledProducts = queryWithVariablesFactory('selledProducts');

export const useShopDetails = queryFactory('getShopDetails');

export const useUserDetails = queryFactory('getUserDetails');
export const useVariantsProducts = queryWithVariablesFactory(
  'getVariantsProducts'
);

export const useFeaturePlugins = queryFactory('getFeaturePlugins');
