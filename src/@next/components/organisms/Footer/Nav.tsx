import { cndUrl } from '@temp/core/constants';
import { NavLink } from '@components/atoms/NavLinkComponent';
import SocialMedia from '@components/molecules/SocialMedia';
import { FooterSecondaryMenu } from '@sdk/queries/gqlTypes/FooterSecondaryMenu';
import { DOCUMENTS_URLS_S3, PHONE_NUMBER } from '@temp/core/config';
import classNames from 'classnames';
import * as React from 'react';
import { Skeleton } from './skeleton';
import * as S from './styles';

type IProps = {
  secondaryMenu: FooterSecondaryMenu;
  loading: boolean;
};

const Nav: React.FC<IProps> = ({ secondaryMenu, loading }) => {
  const [width, setWidth] = React.useState(0);

  const updateDimensions = () => {
    setWidth(window?.innerWidth);
  };

  React.useEffect(() => {
    setWidth(window?.screen.width);
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const renderSecondaryMenu = () => {
    if (loading) return <Skeleton />;

    return secondaryMenu.shop.navigation.secondary.items.map((item) => (
      <div className="fa-mb-8 lg:fa-mb-0" key={item.id}>
        <h5 className="fa-mb-3.5 fa-font-medium fa-text-neutral-lightest fa-text-sm lg:fa-mb-9">
          <NavLink item={item} />
        </h5>
        <S.SectionContent>
          {item.children.map((subItem) => (
            <p
              className={classNames({
                'fa-block': width > 540,
                'fa-hidden': width <= 540,
              })}
              id={subItem.id}
              key={subItem.id}
            >
              <NavLink item={subItem} />
            </p>
          ))}
        </S.SectionContent>
      </div>
    ));
  };

  return (
    <S.FooterWrapper className={classNames('fa-bg-interactive')}>
      <S.Container>
        <div className="fa-mb-8 lg:fa-mb-0">
          <div className="fa-mb-3.5 fa-font-medium fa-text-neutral-lightest fa-text-sm lg:fa-mb-9">
            <div>
              <img
                height={22}
                src={cndUrl + '/assets/logo-farmauna-footer.svg'}
                alt="Logo Farmauna"
                width={133}
              />
            </div>
          </div>
          <S.SectionContent>
            <p>??Necesitas asesor??a?</p>
            <span className="fa-text-sm fa-font-semibold fa-leading-6">
              <a
                className="fa-text-brand-02"
                href="mailto:consultas@farmauna.com"
                target="_blank"
              >
                consultas@farmauna.com
              </a>
              <S.MailToImg
                src={cndUrl + '/assets/icon-previous-email.svg'}
                alt="logo email"
                width="14"
                height="9"
              />
            </span>
            <div className="fa-mt-8 fa-flex fa-items-center">
              <S.PhoneImg
                src={cndUrl + '/assets/phone-icon.svg'}
                alt="logo phone"
                width="25"
                height="25"
              />
              <span className="fa-text-h3 xs:fa-text-h2 fa-font-semibold fa-text-white">
                {PHONE_NUMBER}
              </span>
            </div>
          </S.SectionContent>
        </div>
        {renderSecondaryMenu()}
        <SocialMedia />
      </S.Container>
      <S.ContainerTermsPolicy>
        <S.ContentTerms>
          <S.Privacy className="fa-text-gray fa-font-normal fa-flex fa-flex-col lg:fa-block">
            <label className="fa-mr-auto fa-mb-2.5 fa-text-sm fa-font-normal lg:fa-mr-7 lg:fa-mb-0">
              <a
                href={DOCUMENTS_URLS_S3.politicasDePrivacidadUrl}
                rel="noopener nofollow"
              >
                Pol??ticas de privacidad
              </a>
            </label>
            <label className="fa-mr-auto fa-mb-2.5 fa-text-sm fa-font-normal lg:fa-mr-7 lg:fa-mb-0">
              <a
                href={DOCUMENTS_URLS_S3.terminosYCondicionesUrl}
                rel="noopener nofollow"
              >
                T??rminos y condiciones
              </a>
            </label>
          </S.Privacy>
          <S.Copyright className="fa-text-sm fa-font-normal fa-mt-3 lg:fa-mt-0">
            <a href="#">?? Copyright Farmauna 2021</a>
          </S.Copyright>
        </S.ContentTerms>
      </S.ContainerTermsPolicy>
    </S.FooterWrapper>
  );
};

export default Nav;
