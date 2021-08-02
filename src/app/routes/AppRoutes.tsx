import {
  AccountPage,
  AccountConfirmPage,
  CartPage,
  CheckoutPage,
  PasswordReset,
  ResetPasswordMailSentPage,
  ThankYouPage,
  UserRegistered
} from "@pages";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { CheckoutLogin, NotFound } from "../../components";
import { ArticlePage } from "../../views/Article";
import { CategoryPage } from "../../views/Category";
import { CollectionPage } from "../../views/Collection";
import { HomePage } from "../../views/Home";
import { LandingPage } from "../../views/Landing";
import { ProductPage } from "../../views/Product";
import { SearchPage } from "../../views/Search";
import * as paths from "./paths";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={paths.baseUrl} component={HomePage} />
    <Route path={paths.accountUrl} component={AccountPage} />
    <Route path={paths.accountConfirmUrl} component={AccountConfirmPage} />
    <Route path={paths.searchUrl} component={SearchPage} />
    <Route path={paths.categoryUrl} component={CategoryPage} />
    <Route path={paths.collectionUrl} component={CollectionPage} />
    <Route path={paths.productUrl} component={ProductPage} />
    <Route path={paths.cartUrl} component={CartPage} />
    <Route path={paths.checkoutLoginUrl} component={CheckoutLogin} />
    <Route path={paths.pageUrl} component={ArticlePage} />
    <Route path={paths.passwordResetUrl} component={PasswordReset} />
    <Route path={paths.checkoutUrl} component={CheckoutPage} />
    <Route path={paths.orderFinalizedUrl} component={ThankYouPage} />
    <Route path={paths.resetPasswordMailSentUrl} component={ResetPasswordMailSentPage} />
    <Route path={paths.userRegistered} component={UserRegistered} />
    <Route path={paths.landingUrl} component={LandingPage} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
