import React from "react";
import { Route, Switch } from "react-router-dom";
import { accountCategoriesUrl, addressBookUrl, orderDetailsUrl, orderHistoryUrl, paymentMethodsUrl } from "./paths";
import { AccountTab, AddressBook, CategoriesTab, OrderDetails, OrdersHistory, PaymentMethodList } from "./subpages";

export * from "./paths";


const Routes: React.FC = () => (
  <Switch>
    <Route path={accountCategoriesUrl} component={CategoriesTab} />
    <Route path={addressBookUrl} component={AddressBook} />
    <Route path={orderDetailsUrl} component={OrderDetails} />
    <Route path={orderHistoryUrl} component={OrdersHistory} />
    <Route path={paymentMethodsUrl} component={PaymentMethodList} />
    <Route component={AccountTab} />
  </Switch>
);

export default Routes;
