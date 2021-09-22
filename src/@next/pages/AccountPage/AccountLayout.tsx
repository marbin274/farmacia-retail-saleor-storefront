import { links, baseUrl as AccountBaseUrl } from '@app/pages/AccountPage/paths';
import { Loader } from '@components/atoms';
import { AccountMenu, AccountMenuMobile } from '@components/molecules';
import { Breadcrumbs } from '@farmacia-retail/farmauna-components';
import { useUserDetails } from '@sdk/react';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { baseUrl } from '@temp/app/routes';
import * as React from 'react';
import * as S from './styles';
import { useRouter } from 'next/router';

interface AccountLayoutProps {
  showTitleMobile?: boolean;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  children,
  showTitleMobile,
}) => {
  const { data: user, loading } = useUserDetails();
  const { isDesktopScreen } = useMediaScreen();
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="fa-bg-neutral-light fa-py-4 fa-w-auto md:fa-w-auto">
      <S.Container>
        <Breadcrumbs
          breadcrumbs={[{ link: router.pathname, label: 'Mi Cuenta' }]}
          baseUrl={baseUrl}
        />

        {!isDesktopScreen && (
          <div className="md:fa-w-full fa-my-4">
            <AccountMenuMobile links={links} active={router.pathname} />
          </div>
        )}

        {(isDesktopScreen ||
          (AccountBaseUrl === router.pathname && showTitleMobile)) && (
          <div className="fa-flex fa-flex-row fa-mt-5 fa-mb-3">
            {isDesktopScreen ? (
              <div className="fa-mt-4">
                <img
                  src="/assets/profileicon.svg"
                  alt="profile icon"
                  height="62"
                  width="62"
                />
              </div>
            ) : (
              <div className="fa-mt-0">
                <img
                  src="/assets/profileicon.svg"
                  alt="profile icon"
                  height="62"
                  width="62"
                />
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
        )}

        <div className="fa-flex fa-flex-nowrap fa-items-stretch fa-mb-16 fa-mt-4 fa-flex-col md:fa-flex-row">
          {isDesktopScreen && (
            <div className="fa-w-auto">
              <AccountMenu links={links} active={router.pathname} />
            </div>
          )}
          <div className="fa-w-full">{user && <>{children}</>}</div>
        </div>
      </S.Container>
    </div>
  );
};

export default AccountLayout;
