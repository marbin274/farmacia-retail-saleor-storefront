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
} from "../../app/routes";
import { Link } from "react-router-dom";

import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountTab, OrdersHistory } from "@pages";
import { Breadcrumbs, Loader } from "../../components";
import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";
import { HomeIcon } from "@farmacia-retail/farmauna-components";

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
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { data: user, loading } = useUserDetails();

  const links = [
    { url: accountUrl, label: "Mi perfil" },
    { url: addressBookUrl, label: "Mis direcciones" },
    { url: orderHistoryUrl, label: "Historial de pedidos" },
  ];

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    history.push(baseUrl);
  }

  return (
    <div className="account_container">
      <div className="container">
        <Link to={baseUrl}>
          <HomeIcon size={20} className="breadcrumbs__home-icon" />
        </Link>
        <Breadcrumbs
          breadcrumbs={[{ link: match.path, label: "Mi Cuenta" }]}
          backLabelMobile="Mi cuenta"
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
