import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions,
} from 'apollo-client';
import { RequireOnlyOne } from '../tsHelpers';
import * as Article from './article';
import * as AttributesList from './attributes';
import * as Banner from './banner';
import * as Cart from './cart';
import * as Category from './category';
import * as Collection from './collections';
import {
  ArticleDetail,
  ArticleDetailVariables,
} from './gqlTypes/ArticleDetail';
import { Attributes, AttributesVariables } from './gqlTypes/Attributes';
import {
  CategoryDetails,
  CategoryDetailsVariables,
} from './gqlTypes/CategoryDetails';
import { CategoryList } from './gqlTypes/CategoryList';
import {
  CategoryProducts,
  CategoryProductsVariables,
} from './gqlTypes/CategoryProducts';
import {
  CollectionCategories,
  CollectionCategoriesVariables,
} from './gqlTypes/CollectionCategories';
import {
  CollectionProducts,
  CollectionProductsVariables,
} from './gqlTypes/CollectionProducts';
import {
  FeaturedProducts,
  FeaturedProductsVariables,
} from './gqlTypes/FeaturedProducts';
import { FooterSecondaryMenu } from './gqlTypes/FooterSecondaryMenu';
import {
  GetShippingMethods,
  GetShippingMethodsVariables,
} from './gqlTypes/GetShippingMethods';
import { GetShop } from './gqlTypes/GetShop';
import { GetShopFeaturePlugins } from './gqlTypes/GetShopFeaturePlugins';
import { HomePage } from './gqlTypes/HomePage';
import { Landing, LandingVariables } from './gqlTypes/Landing';
import { MainBanner } from './gqlTypes/MainBanner';
import { MainMenu } from './gqlTypes/MainMenu';
import { OrderByToken, OrderByTokenVariables } from './gqlTypes/OrderByToken';
import { OrdersByUser, OrdersByUserVariables } from './gqlTypes/OrdersByUser';
import {
  ProductDetails,
  ProductDetailsVariables,
} from './gqlTypes/ProductDetails';
import { ProductList, ProductListVariables } from './gqlTypes/ProductList';
import {
  SearchProducts,
  SearchProductsVariables,
} from './gqlTypes/SearchProducts';
import {
  SearchResults,
  SearchResultsVariables,
} from './gqlTypes/SearchResults';
import {
  SelledProducts,
  SelledProductsVariables,
} from './gqlTypes/SelledProducts';
import { UserDetails } from './gqlTypes/UserDetails';
import {
  VariantsProducts,
  VariantsProductsVariables,
} from './gqlTypes/VariantsProducts';
import * as LandingQuery from './landing';
import * as Orders from './orders';
import * as Product from './products';
import * as Search from './search';
import * as Shop from './shop';
import * as User from './user';

type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, 'query'>
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, 'query'>, 'variables'>;

// TODO: Add ability to pass custom fragments to queries
export const QUERIES = {
  Article: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ArticleDetailVariables>
  ): ObservableQuery<ArticleDetail, any> =>
    client.watchQuery({
      query: Article.articleDetail,
      ...options,
    }),
  Attributes: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<AttributesVariables>
  ): ObservableQuery<Attributes, any> =>
    client.watchQuery({
      query: AttributesList.attributes,
      ...options,
    }),
  CategoryDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CategoryDetailsVariables>
  ): ObservableQuery<CategoryDetails, any> =>
    client.watchQuery({
      query: Category.categoryQuery,
      ...options,
    }),
  CategoryList: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<CategoryList, any> =>
    client.watchQuery({
      query: Category.categoryListQuery,
      ...options,
    }),
  CategoryProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CategoryProductsVariables>
  ): ObservableQuery<CategoryProducts, any> =>
    client.watchQuery({
      query: Category.categoryProducts,
      ...options,
    }),
  CollectionProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CollectionProductsVariables>
  ): ObservableQuery<CollectionProducts, any> =>
    client.watchQuery({
      query: Collection.collectionProducts,
      ...options,
    }),
  CollectionCategories: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CollectionCategoriesVariables>
  ): ObservableQuery<CollectionCategories, any> =>
    client.watchQuery({
      query: Collection.collectionCategories,
      ...options,
    }),
  FeaturedProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<FeaturedProductsVariables>
  ): ObservableQuery<FeaturedProducts, any> =>
    client.watchQuery({
      query: Product.featuredProducts,
      ...options,
    }),
  FooterSecondaryMenu: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<FooterSecondaryMenu, any> =>
    client.watchQuery({
      query: Shop.footerSecondaryMenu,
      ...options,
    }),
  GetShippingMethods: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<GetShippingMethodsVariables>
  ): ObservableQuery<GetShippingMethods, any> =>
    client.watchQuery({
      query: Cart.shippingMethodsQuery,
      ...options,
    }),
  GetShopDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShop, any> =>
    client.watchQuery({
      query: Shop.getShop,
      ...options,
    }),
  GetShopFeaturePlugins: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShopFeaturePlugins, any> =>
    client.watchQuery({
      query: Shop.getShopFeaturePlugins,
      ...options,
    }),
  HomePage: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<HomePage, any> =>
    client.watchQuery({
      query: Shop.homePage,
      ...options,
    }),
  Landing: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<LandingVariables>
  ): ObservableQuery<Landing, any> =>
    client.watchQuery({
      query: LandingQuery.landing,
      ...options,
    }),
  MainBanner: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<MainBanner, any> =>
    client.watchQuery({
      query: Banner.mainBanner,
      ...options,
    }),
  MainMenu: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<MainMenu, any> =>
    client.watchQuery({
      query: Category.mainMenu,
      ...options,
    }),
  OrderDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenVariables>
  ): ObservableQuery<OrderByToken, any> =>
    client.watchQuery({
      query: User.orderDetailsByTokenQuery,
      ...options,
    }),
  OrdersByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrdersByUserVariables>
  ): ObservableQuery<OrdersByUser, any> =>
    client.watchQuery({
      query: Orders.ordersByUser,
      ...options,
    }),
  ProductDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductDetailsVariables>
  ): ObservableQuery<ProductDetails, any> =>
    client.watchQuery({
      query: Product.productDetails,
      ...options,
    }),
  ProductList: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductListVariables>
  ): ObservableQuery<ProductList, any> =>
    client.watchQuery({
      query: Product.productList,
      ...options,
    }),
  SearchResults: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<SearchResultsVariables>
  ): ObservableQuery<SearchResults, any> =>
    client.watchQuery({
      query: Search.searchResultsQuery,
      ...options,
    }),
  SearchProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<SearchProductsVariables>
  ): ObservableQuery<SearchProducts, any> =>
    client.watchQuery({
      query: Product.searchProducts,
      ...options,
    }),
  SelledProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<SelledProductsVariables>
  ): ObservableQuery<SelledProducts, any> =>
    client.watchQuery({
      query: Product.selledProducts,
      ...options,
    }),
  UserDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<UserDetails, any> =>
    client.watchQuery({
      query: User.getUserDetailsQuery,
      ...options,
    }),
  VariantsProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<VariantsProductsVariables>
  ): ObservableQuery<VariantsProducts, any> =>
    client.watchQuery({
      query: Product.variantsProducts,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
