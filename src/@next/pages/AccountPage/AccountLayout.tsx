import { links } from '@app/pages/AccountPage/paths';
import { Loader } from '@components/atoms';
import { AccountMenu, AccountMenuMobile } from '@components/molecules';
import { Breadcrumbs } from '@farmacia-retail/farmauna-components';
import { useUserDetails } from '@sdk/react';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { baseUrl } from '@temp/app/routes';
import profile from '@temp/images/profileicon.svg';
import * as React from 'react';
import * as S from './styles';
import { RouteComponentProps, useLocation, withRouter } from 'react-router';

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
          breadcrumbs={[{ link: location.pathname, label: 'Mi Cuenta' }]}
          baseUrl={baseUrl}
        />

        <div className="fa-flex fa-flex-row fa-mt-5 fa-mb-3 ">
          {isDesktopScreen ? (
            <div className="fa-mt-4">
              <img src={profile} alt="profile icon" height="62" width="62" />
            </div>
          ) : (
            <div className="fa-mt-0">
              <img src={profile} alt="profile icon" height="62" width="62" />
            </div>
          )}

          {isDesktopScreen ? (
            <div className="fa-flex fa-flex-col fa-mt-4 fa-mb-4">
              <S.Paragraph>Hola</S.Paragraph>
              <S.Wrapper>{user?.firstName}</S.Wrapper>
            </div>
          ) : (
            <div className="fa-flex fa-flex-row fa-items-center">
              <S.Paragraph>Hola</S.Paragraph>
              <S.WrapperMobile>{user?.firstName}</S.WrapperMobile>
            </div>
          )}
        </div>
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
