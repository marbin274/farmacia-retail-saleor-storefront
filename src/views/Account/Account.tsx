import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useUserDetails } from "@sdk/react";
import AddressBook from "../../account/AddressBook/AddressBook";
import {
  accountCategoriesUrl,
  accountUrl,
  addressBookUrl,
  baseUrl,
  orderHistoryUrl,
  paymentMethodsUrl
} from "../../app/routes";

import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountTab, CategoriesTab, OrdersHistory, PaymentMethodList } from "@pages";
import { Loader } from "../../components";
import { Breadcrumbs } from "@farmacia-retail/farmauna-components";
import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";
import { useMediaScreen } from "@temp/@next/globalStyles";

const returnTab: any = (path: string, userDetails: UserDetails_me, history) => {
  let tabContent = <></>;
  switch (path) {
    case accountCategoriesUrl: {
      tabContent = <CategoriesTab />;
      break;
    }
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
  const { isDesktopScreen } = useMediaScreen();

  const links = [
    { url: accountUrl, label: "Mi perfil" },
    { url: accountCategoriesUrl, label: "Mis categorías"},
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
    <div className="fa-bg-neutral-light fa-pt-4 fa-w-auto md:fa-w-auto">
      <div className="container">
        <Breadcrumbs
          breadcrumbs={[{ link: match.path, label: "Mi Cuenta" }]}
          baseUrl={baseUrl}
        />
        <div className="fa-flex fa-flex-nowrap fa-items-stretch fa-mb-16 fa-mt-4 fa-flex-col md:fa-flex-row">
          {
            isDesktopScreen ? <div className="fa-w-auto">
              <AccountMenu links={links} active={match.path} />
            </div>
              : <div className="md:fa-w-full">
                <AccountMenuMobile links={links} active={match.path} />
              </div>
          }
          <div className="account__content">
            {user && returnTab(match.path, user, history)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Account);
