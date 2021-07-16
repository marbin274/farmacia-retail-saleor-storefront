import * as React from "react";
import Media from "react-responsive";
import { RouteComponentProps, withRouter } from "react-router";

import { useUserDetails } from "@sdk/react";
import { largeScreen } from "@styles/constants";
import AddressBook from "../../account/AddressBook/AddressBook";

import "./scss/index.scss";

import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  orderHistoryUrl,
  paymentMethodsUrl
} from "../../app/routes";

import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountTab, OrdersHistory, PaymentMethodList } from "@pages";
import { Loader } from "../../components";
import { Breadcrumbs } from "@farmacia-retail/farmauna-components";
import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";

const returnTab: any = (path: string, userDetails: UserDetails_me, history) => {
  let tabContent = <></>;
  switch (path) {
    case accountUrl: {
      tabContent = <AccountTab />;
      break;
    }
    case addressBookUrl: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }
    case orderHistoryUrl: {
      tabContent = <OrdersHistory {...{ history }} />;
      break;
    }
    case paymentMethodsUrl: {
      tabContent = <PaymentMethodList history={history} user={userDetails} />;
      break;
    }
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { data: user, loading } = useUserDetails();

  const links = [
    { url: accountUrl, label: "Mi perfil" },
    { url: addressBookUrl, label: "Mis direcciones" },
    { url: orderHistoryUrl, label: "Historial de pedidos" },
    { url: paymentMethodsUrl, label: "Mis medios de pago" },
  ];

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    history.push(baseUrl);
  }

  return (
    <div className="account_container fa-pt-4">
      <div className="container">
        <Breadcrumbs
          breadcrumbs={[{ link: match.path, label: "Mi Cuenta" }]}
          baseUrl={baseUrl}
        />
        <div className="account">
          <Media minWidth={largeScreen + 1}>
            <div className="account__menu">
              <AccountMenu links={links} active={match.path} />
            </div>
          </Media>
          <Media maxWidth={largeScreen}>
            <div className="account__menu_mobile">
              <AccountMenuMobile links={links} active={match.path} />
            </div>
          </Media>
          <div className="account__content">
            {user && returnTab(match.path, user, history)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Account);
