import { links } from "@app/pages/AccountPage/paths";
import { Loader } from "@components/atoms";
import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { Breadcrumbs } from "@farmacia-retail/farmauna-components";
import { useUserDetails } from "@sdk/react";
import { useMediaScreen } from "@temp/@next/globalStyles";
import { baseUrl } from "@temp/app/routes";
import * as React from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router";

const AccountLayout: React.FC<RouteComponentProps> = ({
  children,
  history,
}) => {
  const { data: user, loading } = useUserDetails();
  const { isDesktopScreen } = useMediaScreen();
  const location = useLocation();

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
          breadcrumbs={[{ link: location.pathname, label: "Mi Cuenta" }]}
          baseUrl={baseUrl}
        />
        <div className="fa-flex fa-flex-nowrap fa-items-stretch fa-mb-16 fa-mt-4 fa-flex-col md:fa-flex-row">
          {isDesktopScreen ? (
            <div className="fa-w-auto">
              <AccountMenu links={links} active={location.pathname} />
            </div>
          ) : (
            <div className="md:fa-w-full">
              <AccountMenuMobile links={links} active={location.pathname} />
            </div>
          )}
          <div className="fa-w-full">{user && <>{children}</>}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AccountLayout);
