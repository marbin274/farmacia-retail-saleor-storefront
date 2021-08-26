import { CheckoutLogin } from '@components/organisms/CheckoutLogin';
import {
  AccountConfirmPage,
  AccountPage,
  ArticlePage,
  CartPage,
  CategoryPage,
  CheckoutPage,
  CollectionPage,
  HomePage,
  LandingPage,
  NotFound,
  PasswordReset,
  ProductPage,
  ResetPasswordMailSentPage,
  SearchPage,
  ThankYouPage,
  UserRegistered,
} from '@pages';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as paths from './paths';

export const Routes: React.FC = () => (
  <Switch>
    <Route path={paths.accountUrl} component={AccountPage} />
    <Route path={paths.accountConfirmUrl} component={AccountConfirmPage} />
    <Route path={paths.baseUrl} exact component={HomePage} />
    <Route path={paths.cartUrl} component={CartPage} />
    <Route path={paths.categoryUrl} component={CategoryPage} />
    <Route path={paths.checkoutLoginUrl} component={CheckoutLogin} />
    <Route path={paths.checkoutUrl} component={CheckoutPage} />
    <Route path={paths.collectionUrl} component={CollectionPage} />
    <Route path={paths.landingUrl} component={LandingPage} />
    <Route path={paths.orderFinalizedUrl} component={ThankYouPage} />
    <Route path={paths.pageUrl} component={ArticlePage} />
    <Route path={paths.passwordResetUrl} component={PasswordReset} />
    <Route path={paths.productUrl} component={ProductPage} />
    <Route
      path={paths.resetPasswordMailSentUrl}
      component={ResetPasswordMailSentPage}
    />
    <Route path={paths.searchUrl} component={SearchPage} />
    <Route path={paths.userRegistered} component={UserRegistered} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
