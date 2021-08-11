import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions,
} from 'apollo-client';

import { RequireOnlyOne } from '../tsHelpers';
import * as Article from './article';
import * as Banner from './banner';
import * as LandingQuery from './landing';
import * as AttributesList from './attributes';
import * as Category from './category';
import * as Collection from './collections';
import * as Orders from './orders';
import * as Product from './products';
import * as Shop from './shop';

import { OrderByToken, OrderByTokenVariables } from './gqlTypes/OrderByToken';

import { Attributes, AttributesVariables } from './gqlTypes/Attributes';
import {
  ProductDetails,
  ProductDetailsVariables,
} from './gqlTypes/ProductDetails';

import { ProductList, ProductListVariables } from './gqlTypes/ProductList';

import {
  CategoryDetails,
  CategoryDetailsVariables,
} from './gqlTypes/CategoryDetails';

import { GetShop } from './gqlTypes/GetShop';

import { OrdersByUser, OrdersByUserVariables } from './gqlTypes/OrdersByUser';
import { UserDetails } from './gqlTypes/UserDetails';
import {
  VariantsProducts,
  VariantsProductsVariables,
} from './gqlTypes/VariantsProducts';

import * as User from './user';
import { CategoryList } from './gqlTypes/CategoryList';
import {
  ArticleDetailVariables,
  ArticleDetail,
} from './gqlTypes/ArticleDetail';
import { LandingVariables, Landing } from './gqlTypes/Landing';
import {
  SearchProductsVariables,
  SearchProducts,
} from './gqlTypes/SearchProducts';
import {
  CollectionProductsVariables,
  CollectionProducts,
} from './gqlTypes/CollectionProducts';
import {
  CollectionCategoriesVariables,
  CollectionCategories,
} from './gqlTypes/CollectionCategories';
import {
  CategoryProductsVariables,
  CategoryProducts,
} from './gqlTypes/CategoryProducts';
import { HomePage } from './gqlTypes/HomePage';
import { MainBanner } from './gqlTypes/MainBanner';

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
  GetShopDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShop, any> =>
    client.watchQuery({
      query: Shop.getShop,
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
  SearchProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<SearchProductsVariables>
  ): ObservableQuery<SearchProducts, any> =>
    client.watchQuery({
      query: Product.searchProducts,
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
